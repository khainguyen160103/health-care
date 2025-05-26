from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.urls import path
from chatbot.consumers import ChatBotConsumer

application = ProtocolTypeRouter({
    "websocket": AuthMiddlewareStack(
        URLRouter([
            path("ws/chatbot/", ChatBotConsumer.as_asgi()),
        ])
    ),
})
