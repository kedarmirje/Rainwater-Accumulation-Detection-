import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

class AlertService:
    def __init__(self):
        self.gmail_user = os.getenv('GMAIL_USER')
        self.gmail_password = os.getenv('GMAIL_APP_PASSWORD')
    
    def send_alert(self, user_email, flood_data):
        """Send email alert to user"""
        try:
            msg = MIMEMultipart()
            msg['From'] = self.gmail_user
            msg['To'] = user_email
            msg['Subject'] = '⚠️ FLOOD ALERT - Immediate Action Required'
            
            body = f"""
            FLOOD ALERT NOTIFICATION
            
            Location: {flood_data['latitude']}, {flood_data['longitude']}
            Flood Risk Level: {flood_data['flood_risk'] * 100:.1f}%
            Estimated Water Depth: {flood_data['depth_cm']:.1f} cm
            Time: {flood_data['timestamp']}
            
            SAFETY RECOMMENDATIONS:
            - Avoid the affected area
            - Seek higher ground if in danger
            - Do not attempt to drive through flooded areas
            - Follow local emergency services instructions
            
            Stay safe!
            Flood Detection System
            """
            
            msg.attach(MIMEText(body, 'plain'))
            
            server = smtplib.SMTP('smtp.gmail.com', 587)
            server.starttls()
            server.login(self.gmail_user, self.gmail_password)
            server.send_message(msg)
            server.quit()
            
            return True
        except Exception as e:
            print(f"Alert send failed: {e}")
            return False
