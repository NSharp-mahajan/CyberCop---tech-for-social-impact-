# CyberCop Safe Space

🛡️ **AI-Powered Cybersecurity & Fraud Detection Platform**

A comprehensive web application for detecting and preventing various forms of cyber threats including fraud messages, document forgery, voice scams, and malicious URLs.

## 🚀 Features

### 📧 Message Detector
- **AI-Powered Analysis**: Advanced sentiment analysis and pattern recognition
- **Multiple Scam Categories**: Nigerian Prince, Phishing, Job Offers, Romance Scams, etc.
- **Real-Time Scoring**: Risk assessment with confidence levels
- **Sample Messages**: Quick test with known scam examples

### 📄 Document Scanner
- **OCR Technology**: Extract text from images and documents
- **Fraud Detection**: Identify forged documents and suspicious content
- **Risk Analysis**: Comprehensive document authenticity scoring
- **Visual Preview**: Image upload with instant analysis

### 🎤 Voice Analyzer
- **Audio Processing**: Real-time voice recording and analysis
- **Scam Detection**: Identify suspicious patterns in voice communications
- **Transcription**: Convert audio to text for analysis
- **Risk Indicators**: Multiple threat detection categories

### 🔗 URL Security Scanner
- **Link Analysis**: Check URLs for malicious content
- **Phishing Detection**: Identify suspicious domains and patterns
- **Risk Classification**: Safe, Suspicious, or Malicious categorization
- **Real-Time Validation**: Instant URL security assessment

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Components**: Tailwind CSS + shadcn/ui
- **Icons**: Lucide React
- **Authentication**: React Context (AuthContext)
- **State Management**: React Hooks
- **Notifications**: Custom Toast System

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/CyberCop-Safe-Space.git
   cd CyberCop-Safe-Space
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to `http://localhost:8080`

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── UrlChecker.tsx   # URL security scanner
│   ├── FIRForm.tsx      # FIR Generator form
│   └── ...
├── pages/               # Main application pages
│   ├── AIDetectionHub.tsx    # Main detection hub
│   ├── FirGenerator.tsx      # FIR Generator
│   └── ...
├── hooks/               # Custom React hooks
│   └── use-toast.ts     # Toast notification system
├── contexts/            # React contexts
│   └── AuthContext.tsx  # Authentication context
├── services/            # API services
│   └── firService.ts    # FIR submission service
└── utils/               # Utility functions
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
# Firebase Configuration (if using)
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id

# API Keys (optional)
VITE_GEMINI_API_KEY=your_gemini_api_key
```

### Firebase Setup (Optional)
1. Create a Firebase project
2. Enable Authentication and Firestore
3. Add Firebase configuration to environment variables
4. Deploy Firebase Functions for backend services

## 🎯 Usage

### Message Detection
1. Navigate to **Message Detector** tab
2. Enter or paste a suspicious message
3. Click **Analyze Message**
4. Review risk assessment and recommendations

### Document Analysis
1. Go to **Document Scanner** tab
2. Upload an image (JPG, PNG, etc.)
3. Wait for OCR processing
4. Review fraud detection results

### Voice Analysis
1. Select **Voice Analyzer** tab
2. Click **Start Recording** or upload audio file
3. Record or upload suspicious audio
4. Analyze scam detection results

### URL Security
1. Use **URL Scanner** tab
2. Enter suspicious URL
3. Click **Check URL**
4. Review security assessment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Tailwind CSS for styling

## 🔐 Security Features

### Detection Capabilities
- **Phishing Attempts**: Email and SMS phishing detection
- **Document Forgery**: Fake document identification
- **Voice Scams**: Telephone and voice message scams
- **Malicious URLs**: Phishing and malware link detection
- **Social Engineering**: Manipulation tactic detection

### Risk Assessment
- **Low Risk**: Minimal suspicious indicators
- **Medium Risk**: Some concerning patterns detected
- **High Risk**: Multiple threat indicators present
- **Critical Risk**: Immediate action required

## 🌟 Future Enhancements

- [ ] Real-time threat intelligence feeds
- [ ] Machine learning model improvements
- [ ] Mobile application development
- [ ] Browser extension for real-time protection
- [ ] Advanced reporting and analytics
- [ ] Multi-language support

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review existing issues and discussions

## 🙏 Acknowledgments

- Firebase for backend services
- shadcn/ui for beautiful components
- Lucide for icon library
- Tailwind CSS for styling
- Vite for fast development

---

**⚠️ Disclaimer**: This tool is for educational and demonstration purposes. Always verify suspicious content through official channels and report threats to appropriate authorities.

**🛡️ Stay Safe Online**: Think before you click, verify before you trust!
