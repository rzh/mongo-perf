from argparse import ArgumentParser
from subprocess import Popen, PIPE, call
import sys


def parse_arguments():
    usage = "python benchrun.py -f <list of test files> -t <list of thread configurations>"
    parser = ArgumentParser(description="Performance testing script framework thing.", usage=usage)

    parser.add_argument('-f', '--testfiles', dest='testfiles', nargs="+",
                        help='Provide a list of js test files to run',
                        default=None)
    parser.add_argument('-t', '--threads', dest='threads', nargs="+",
                        help='Specify which thread configuration to use',
                        type=int, default=[1, 2, 4, 8, 12, 16])
    parser.add_argument('-m', '--multidb', dest='multidb',
                        help='Specify how many databases the test should use',
                        type=int, default=1)
    parser.add_argument('-c', '--shard', dest='sharddb',
                        help='Specify shard cluster the test should use, 0 - no shard, 1 - use shard cluster',
                        type=int, default=1)
    parser.add_argument('-l', '--label', dest='reportlabel',
                        help='Specify the label for the report stats saved to bench_results db',
                        default='')
    parser.add_argument('--rhost', '--reporthost', dest='reporthost',
                        help='Host name of the mongod where the results will be saved',
                        default='localhost')
    parser.add_argument('--rport', '--reportport', dest='reportport',
                        help='Port of the mongod where the results will be saved',
                        default='27017')
    parser.add_argument('-s', '--shell', dest='shellpath',
                        help="Path to the mongo shell executable to use.",
                        default='mongo')

    return parser.parse_known_args()


def main():
    args, extra_args = parse_arguments()

    if not args.testfiles:
        print("Must provide at least one test file. Run with --help for details.")
        sys.exit(1)

    if args.multidb < 1:
        print("MultiDB option must be greater than zero. Will be set to 1.")
        args.multidb = 1

    if args.sharddb < 0:
        print("ShardDB option must be either 0 or 1. Will be set to 0.")
        args.sharddb = 0
    elif args.sharddb > 1:
        print("ShardDB option must be either 0 or 1. Will be set to 1.")
        args.sharddb = 1


    # Print version info.
    call([args.shellpath, "--norc", "--eval",
          "print('db version: ' + db.version()); db.serverBuildInfo().gitVersion;"])
    print("")

    # Open a mongo shell subprocess and load necessary files.
    mongo_proc = Popen([args.shellpath, "--norc"], stdin=PIPE, stdout=PIPE)
    mongo_proc.stdin.write("load('util/utils.js')\n")
    for testfile in args.testfiles:
        mongo_proc.stdin.write("load('" + testfile + "')\n")

    # Pipe commands to the mongo shell to kickoff the test.
    cmdstr = ("runTests(" +
              str(args.threads) + ", " +
              str(args.multidb) + ", " +
              str(args.sharddb) + ", " +
              "'" + args.reportlabel + "', " +
              "'" + args.reporthost + "', " +
              "'" + args.reportport + "'" +
              ");\n")
    mongo_proc.stdin.write(cmdstr)
    mongo_proc.stdin.close()

    # Read test output.
    readout = False
    for line in iter(mongo_proc.stdout.readline, ''):
        line = line.strip()
        if line == "@@@START@@@":
            readout = True
        elif line == "@@@END@@@":
            readout = False
        elif readout:
            print line

    print("Finished Testing.")


if __name__ == '__main__':
    main()
