from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import SymptomInputSerializer, ChatbotQuestionSerializer
from .ai import predict_with_uncertainty, diseases, test_map, medicine_map
from .intents import (
    detect_intent, get_booking_info, get_working_time_info,
    get_address_info, get_price_info, get_faq_info
)
from rest_framework.decorators import api_view
from django.utils import timezone
import numpy as np

class ChatbotDiagnosisView(APIView):
    def post(self, request):
        serializer = SymptomInputSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            input_array = np.array([[
                int(data['fever']),
                int(data['cough']),
                int(data['sneezing']),
                int(data['fatigue']),
                int(data['loss_of_taste']),
                int(data['itchy_eyes']),
            ]], dtype=np.float32)
            mean_probs, std_probs = predict_with_uncertainty(input_array)
            most_likely = int(np.argmax(mean_probs))
            diagnosis = diseases[most_likely]
            response = {
                "diagnosis": diagnosis,
                "probabilities": {diseases[i]: float(mean_probs[0][i]) for i in range(4)},
                "uncertainty": {diseases[i]: float(std_probs[0][i]) for i in range(4)},
                "suggested_test": test_map[diagnosis],
                "suggested_medicine": medicine_map[diagnosis]
            }
            return Response(response)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ChatbotQAView(APIView):
    def post(self, request):
        serializer = ChatbotQuestionSerializer(data=request.data)
        if serializer.is_valid():
            question = serializer.validated_data['question']
            intent = detect_intent(question)
            if intent == "booking":
                data = get_booking_info()
            elif intent == "working_time":
                data = get_working_time_info()
            elif intent == "address":
                data = get_address_info()
            elif intent == "price":
                data = get_price_info()
            else:
                data = get_faq_info()
            return Response(data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def chat_history(request):
    """Lấy lịch sử chat của user"""
    # Implement chat history logic here
    return Response({
        'message': 'Chat history endpoint',
        'history': []
    })

@api_view(['POST'])
def save_chat(request):
    """Lưu cuộc trò chuyện"""
    user_message = request.data.get('user_message')
    bot_response = request.data.get('bot_response')
    
    # Save to database if needed
    return Response({
        'message': 'Chat saved successfully',
        'user_message': user_message,
        'bot_response': bot_response
    })

class HealthCheckView(APIView):
    """Health check cho chat service"""
    def get(self, request):
        return Response({
            'status': 'healthy',
            'service': 'chat-service',
            'timestamp': timezone.now()
        })
