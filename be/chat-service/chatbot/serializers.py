from rest_framework import serializers

class SymptomInputSerializer(serializers.Serializer):
    fever = serializers.BooleanField()
    cough = serializers.BooleanField()
    sneezing = serializers.BooleanField()
    fatigue = serializers.BooleanField()
    loss_of_taste = serializers.BooleanField()
    itchy_eyes = serializers.BooleanField()

class ChatbotQuestionSerializer(serializers.Serializer):
    question = serializers.CharField()
