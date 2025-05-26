import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .ai import predict_with_uncertainty, diseases, test_map, medicine_map
import numpy as np

class ChatBotConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        data = json.loads(text_data)
        # Nhận input dạng: {"fever": true, "cough": false, ...} hoặc {"question": "..."}
        if "fever" in data:
            input_array = np.array([[
                int(data.get('fever', 0)),
                int(data.get('cough', 0)),
                int(data.get('sneezing', 0)),
                int(data.get('fatigue', 0)),
                int(data.get('loss_of_taste', 0)),
                int(data.get('itchy_eyes', 0)),
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
            await self.send(text_data=json.dumps(response))
        elif "question" in data:
            # Có thể tích hợp intent/rule/AI trả lời tự động ở đây
            await self.send(text_data=json.dumps({
                "answer": "Tôi đã nhận được câu hỏi của bạn. (Bạn có thể tích hợp AI trả lời ở đây)"
            }))
