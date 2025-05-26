import re

def detect_intent(question):
    q = question.lower()
    if "đặt lịch" in q or "đăng ký khám" in q:
        return "booking"
    if "giờ làm việc" in q or "thời gian khám" in q:
        return "working_time"
    if "địa chỉ" in q or "ở đâu" in q:
        return "address"
    if "giá" in q or "phí" in q:
        return "price"
    # ...có thể mở rộng thêm intent...
    return "faq"

def get_booking_info():
    return {
        "text": (
            "Để đặt lịch khám tại Khoa Phục hồi chức năng, bạn có thể thực hiện theo các cách sau:\n"
            "Cách 1: Đặt lịch qua BookingCare: "
            "https://bookingcare.vn/co-so-y-te/kham-phuc-hoi-chuc-nang-benh-vien-huu-nghi-viet-duc-p119\n"
            "Cách 2: Đặt lịch qua tổng đài 19001902 (24/7)\n"
            "Cách 3: Đăng ký trực tiếp tại Quầy cung cấp thông tin tầng 1, nhà H."
        ),
        "booking_options": [
            {
                "doctor": "GS, PGS, TS, BSCKII, Trưởng khoa, Phó khoa Phục hồi chức năng",
                "address": "Nhà H, tầng 1 cổng số 7 số 16 Phủ Doãn, Hoàn Kiếm, Hà Nội",
                "price": "500.000đ",
                "times": ["13:30 - 14:00", "14:00 - 14:30"],
                "booking_link": "https://bookingcare.vn/co-so-y-te/kham-phuc-hoi-chuc-nang-benh-vien-huu-nghi-viet-duc-p119"
            }
        ]
    }

def get_working_time_info():
    return {
        "text": "Giờ làm việc: 7h00 - 17h00 từ thứ 2 đến thứ 7. Chủ nhật nghỉ.",
    }

def get_address_info():
    return {
        "text": "Địa chỉ: Nhà H, tầng 1 cổng số 7 số 16 Phủ Doãn, Hoàn Kiếm, Hà Nội.",
    }

def get_price_info():
    return {
        "text": "Giá khám: 500.000đ/lượt. Xem chi tiết tại website BookingCare.",
    }

def get_faq_info():
    return {
        "text": "Xin lỗi, tôi chưa hiểu câu hỏi của bạn. Bạn vui lòng hỏi lại hoặc liên hệ tổng đài 19001902 để được hỗ trợ."
    }
