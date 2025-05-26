from django.urls import path
from .views import ChatbotQAView

urlpatterns = [
    path('ask/', ChatbotQAView.as_view(), name='chatbot-qa'),
]
