from django.urls import path
from .views import ChatbotQAView, chat_history, save_chat, HealthCheckView

urlpatterns = [
    path('ask/', ChatbotQAView.as_view(), name='chatbot-qa'),
    path('history/', chat_history, name='chat-history'),
    path('save/', save_chat, name='save-chat'),
    path('health/', HealthCheckView.as_view(), name='health-check'),
]
