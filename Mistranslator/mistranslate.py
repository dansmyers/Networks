import google.cloud.translate_v2 as tl
import os,random,json

#Set up environment variables when imported
__location__ = os.path.join(os.getcwd(),os.path.dirname(__file__))
gac_filepath = os.path.join(__location__, 'gac-key.json')
conf_filepath = os.path.join(__location__, 'config.json')
cf = open(gac_filepath)
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = os.path.join(__location__, 'gac-key.json')

class MTClient(tl.Client):
    config = {'max-tl-chain': 20}
    cfgfile = None
    try:
        cfgfile = open(conf_filepath)
        cfgjson = cfgfile.read()
        config = json.loads(cfgjson)
    except FileNotFoundError:
        print("WARNING: config.json file not found; using defaults.")
            
    def __init__(self):
        #Set environment variable
        #Run parent init
        tl.Client.__init__(self)
        self.langdata = self.get_languages()
    
    #Update language database
    def update_languages(self):
        self.langdata = self.get_languages()
    
    #Check whether or not a language code is valid.
    def check_langcode(self,langcode):
        if not isinstance(langcode,str):
            raise TypeError('Language code must be a string')
        for i in self.langdata:
            if langcode.lower() == i['language'].lower() or langcode.lower() == i['name'].lower():
                return i['language']
        #If no matches occur, the code is invalid
        raise ValueError("Invalid language code '{0}'".format(langcode))
            
        
    def chain_translate_random(self,inputstr,iters,outputlang,inputlang=None,listmode=0,langlist=None):
        """Run a string of text through the translator a set number of times, using random languages for each iteration. Returns a string.
        
        REQUIRED VALUES:
        inputstr  : The input string of text.
        iters     : An integer defining the number of additional translations to be performed. Default allowed range is 1~20.
        outputlang: The language to translate the resultant text into.
        
        OPTIONAL VALUES:
        inputlang : The language code for input. If omitted, automatically determines language.
        listmode  : Specifies whether the translation languages will be restricted. 0 = None; all languages may be used. 1 = Blacklist; languages in langlist will not be used. 2 = Whilelist; only languages in langlist will be used. Defaults to 0.
        langlist  : A list or tuple of strings containing language codes to be used as either a language blacklist or whitelist, as specified by listmode.
        """
        #Check parameter values
        if not isinstance(inputstr,str):
            raise TypeError('Input must be a string')
        
        if not isinstance(iters,int):
            raise TypeError('Number of iterations must be a valid integer')
        elif iters < 1 or iters > 20:
            raise ValueError('Number of iterations must be between 1 and 20')
        
        outputlang = self.check_langcode(outputlang)
        
        if inputlang != None:
            inputlang = self.check_langcode(inputlang)
            
        if not isinstance(listmode,int):
            raise TypeError('listmode must be an integer')
        if listmode < 0 or listmode > 2:
            raise ValueError('listmode must be 0, 1 or 2')
        
        if listmode != 0:
            if isinstance(langlist,str):
                langlist = langlist.split(',')
            if isinstance(langlist,list) or isinstance(langlist,tuple):
                for i in langlist:
                    i = self.check_langcode(i)
            else:
                raise TypeError('Language list must be a list of strings, or a list in the form of a string')
        
        #Once all data is validated, proceed with translation
        rval = {}
        rval['input'] = inputstr
        rval['inputlang'] = inputlang
        rval['iters'] = []
        curinput = inputstr
        for i in range(iters):
            #Select a random language to translate to
            if listmode == 2:
                thislang = random.choice(langlist)
            else:
                thislang = random.choice(self.langdata)['language']
            while listmode == 1 and thislang in langlist:
                thislang = random.choice(self.langdata)['language']
            #Translate and save this iteration
            result = self.translate(curinput,thislang,'text',inputlang)
            curinput = result['translatedText']
            if rval['inputlang'] == None:
                rval['inputlang'] = result['detectedSourceLanguage']
            #Discard the inputlang value for subsequent translations
            inputlang = None
            rval['iters'].append({'language':thislang,'result':curinput})
        #Finally, translate the result to the target language
        result = self.translate(curinput,outputlang,'text')
        rval['iters'].append({'language':outputlang,'result':result['translatedText']})
        return rval
