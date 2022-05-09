from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Quiz
from .serializers import QuizSerializer


@api_view(['GET'])
def test(request):
    tests = Quiz.objects.order_by('?')[:5]
    serializer = QuizSerializer(tests, many=True)
    return Response(serializer.data)
