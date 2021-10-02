from django.shortcuts import render
import json
from quizletScrapper.main import *

# Create your views here.
from django.shortcuts import render
import json
from django.contrib.auth.models import User
from django.http import JsonResponse, HttpResponse

def index(request):
    return HttpResponse("In index")

def get_Quizlet(request):
    quizletURL = request.GET.get('topic', None)

    print('topic:', quizletURL)

    """data = {
        'content': main(quizletURL)
    }"""

    data = {
        'URL': quizletURL
    }
    #main(quizletURL)
    return JsonResponse(main(quizletURL))
    #return HttpResponse("In getQuizlet")
