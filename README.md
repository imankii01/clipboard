# 📎 Clipboard Manager

A beautiful, feature-rich browser-based clipboard manager that captures, stores, and organizes your clipboard history without requiring any extensions or backend services.

## 🌐 Live Demo

**🔗 [clipboard.snapstay.in](https://clipboard.snapstay.in)**

## 📌 What is this?

Clipboard Manager is a modern web application that solves the common problem of losing previously copied text when your clipboard gets overwritten. It automatically captures everything you copy in your browser and provides powerful tools to organize, search, and reuse your clipboard history.

Perfect for developers, writers, researchers, and anyone who frequently copies and pastes text snippets, code, URLs, or notes.

## ✨ Features

### 🔥 Core Features
- **📋 Automatic Clipboard History** - Captures everything you copy automatically
- **🏷️ Smart Tagging System** - Organize clips with custom and auto-generated tags
- **🔍 Advanced Search & Filter** - Find clips by content, tags, or date
- **📤 One-Click Re-copy** - Copy any stored clip back to clipboard instantly
- **📌 Pin Important Clips** - Keep important snippets at the top
- **💾 Persistent Storage** - All data stays in your browser (localStorage)
- **🌙 Dark/Light Mode** - Beautiful themes with smooth transitions
- **📱 Responsive Design** - Works perfectly on desktop and mobile

### 🚀 Advanced Features
- **📎 Manual Clip Addition** - Add custom notes and snippets
- **🗑️ Smart Cleanup** - Auto-delete old clips (24h) with pin protection
- **🔄 Bulk Operations** - Select and manage multiple clips at once
- **📊 QR Code Generation** - Share clips via QR codes
- **🔗 Share Functionality** - Native sharing API support
- **🎨 Modern Animations** - Smooth micro-interactions and transitions
- **⚡ Performance Optimized** - Fast loading and smooth experience

### 🛡️ Privacy & Security
- **🔒 No Data Leaves Your Browser** - Everything stored locally
- **🚫 No Extensions Required** - Pure web application
- **🔐 No Backend/Server** - Complete client-side solution
- **🧹 Auto-Cleanup** - Automatic removal of old content

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Storage**: Browser localStorage
- **APIs**: Clipboard API, Web Share API

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/imankii01/clipboard.git
   cd clipboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📖 Usage

1. **Automatic Capture**: Simply copy any text (Ctrl+C) and it will appear in your clipboard history
2. **Manual Addition**: Click "Add clip manually" to create custom notes
3. **Organization**: Add tags to categorize your clips
4. **Search**: Use the search bar to find specific clips
5. **Quick Copy**: Click the copy button on any clip to copy it back
6. **Pin Important**: Pin frequently used clips to keep them at the top
7. **Share**: Use QR codes or native sharing to share clips across devices

## 🎨 Features in Detail

### Clipboard Monitoring
The app automatically monitors your clipboard using the modern Clipboard API, capturing text you copy from any source while respecting browser security policies.

### Smart Tagging
- Auto-generated tags for captured content
- Custom tags for manual organization
- Filter by single or multiple tags
- Visual tag indicators with color coding

### Advanced Search
- Real-time search through clip content
- Tag-based filtering
- Sort by date or pinned status
- Instant results with highlighting

### Modern UI/UX
- Glass-morphism design with backdrop blur
- Smooth animations and micro-interactions
- Responsive grid layout
- Dark/light mode with system preference detection
- Toast notifications for user feedback

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Maintain responsive design
- Add proper error handling
- Write meaningful commit messages

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙌 Credits

**All credit goes to [Ankit Singh (@imankii01)](https://github.com/imankii01)** - also known as `@bymecofee` on social media.

- **GitHub**: [@imankii01](https://github.com/imankii01)
- **Twitter**: [@bymecofee](https://twitter.com/bymecofee)
- **Powered by**: [Snapstay](https://snapstay.in)

## 🔗 Links

- **🌐 Live Site**: [clipboard.snapstay.in](https://clipboard.snapstay.in)
- **📂 Repository**: [github.com/imankii01/clipboard](https://github.com/imankii01/clipboard)
- **🐛 Issues**: [Report bugs or request features](https://github.com/imankii01/clipboard/issues)

## 📊 Browser Support

- ✅ Chrome 66+
- ✅ Firefox 63+
- ✅ Safari 13.1+
- ✅ Edge 79+

*Note: Clipboard API requires HTTPS in production*

## 🔮 Roadmap

- [ ] Export/Import clipboard history
- [ ] Sync across devices (optional backend)
- [ ] Rich text support
- [ ] Image clipboard support
- [ ] Keyboard shortcuts
- [ ] Browser extension version
- [ ] Offline PWA support

---

**Made with ❤️ by [Ankit Singh](https://github.com/imankii01) | Powered by [Snapstay](https://snapstay.in)**# clipboard
