from argparse import ArgumentParser

from find.search import search
from find.url import byurl
from utils.banner import banner

parser = ArgumentParser(
    prog = "moo",
    description = "Download musics directly from YouTube. \033[1;32m(v0.1.1-rc1)\033[m",
)

parser.add_argument('query', type = str)
parser.add_argument('-f', '--filename', help = 'Set the filename', type = str)
parser.add_argument('-p', '--path', help = 'Set the final path', type = str)
parser.add_argument('-m', '--max', help = 'Set the max number of results while search', default = 10, type = int)
parser.add_argument('-F', '--first', help = 'Download very first result without needing choose', action = 'store_true')
args = parser.parse_args()

banner()

if "/watch?v=" in args.query or "youtu.be" in args.query:
    byurl(args.query, args.filename, args.path, args.first)

else:
    search(args.query, args.filename, args.path, args.max, args.first)
