import discord
from discord.ext import commands
import logging, re
import mistranslate as mt

#Initial setup
logging.basicConfig(level=logging.INFO)

__location__ = os.path.join(os.getcwd(),os.path.dirname(__file__))
conf_filepath = os.path.join(__location__, 'config.json')
try:
    cfgfile = open(conf_filepath)
    cfgjson = cfgfile.read()
    config = json.loads(cfgjson)
except FileNotFoundError:
    print("FATAL: config.json file not found. Unable to log into Discord account.")

cmdbot = commands.Bot(command_prefix='mistl:')

@cmdbot.command()
async def translate(ctx, *args):
    list_mode = 0 # 0 = unused (normal translation), 1 = random chain blacklist, 2 = random chain whitelist, 3 = specific language list
    iterations = 0
    #Check parameters
    while len(args) > 0:
        curarg = args.pop(0)
        #Check if parameter is a tag
        if re.fullmatch(r'-\w+')

class BotClient(discord.Client):
    async def on_ready(self):
        print('Login successful. User ID: {0}'.format(self.user))
        
    async def on_message(self,message):
        if message.author == client.user:
            return
        #Parse input
        if message.content.startswith('mistl:'):
            #Strip invocation from input message
            inputstr = message.content[6:]
            command = inputstr.split(' ',1)[0]
            inputstr = inputstr.split(' ',1)[1]
            
            if command == "translate":
                tlcl = mt.MTClient()
        
client = BotClient()
client.run("")
