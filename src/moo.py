from argparse import ArgumentParser

from find.search import search
from find.url import byurl

parser = ArgumentParser(
    prog = "moo",
    description = "Download musics directly from YouTube",
)

parser.add_argument('query', type = str)
parser.add_argument('-f', '--filename', help = 'Set the filename', type = str)
parser.add_argument('-p', '--path', help = 'Set the final path', type = str)
parser.add_argument('-m', '--max', help = 'Set the max number of results while search', default = 10, type = int)
args = parser.parse_args()

if "/watch?v=" in args.query or "youtu.be" in args.query:
    byurl(args.query, args.filename, args.path)

else:
    search(args.query, args.filename, args.path, args.max)
