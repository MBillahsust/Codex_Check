import React, { useState, useEffect, useRef } from 'react';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';

export default function CounsellorBotChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, []);

  const handleInputChange = (event) => setInput(event.target.value);

  const toggleListening = () => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }

    setIsListening((prev) => !prev);
  };

  useEffect(() => {
    if (!messages.length || !window.speechSynthesis) return;
    const last = messages[messages.length - 1];
    if (last.sender === 'bot') {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(last.text);
      window.speechSynthesis.speak(utterance);
    }
  }, [messages]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const systemPrompt = `You are CounsellorGPT, a kind, thoughtful and compassionate AI counselor who supports emotional well-being and mental health. Respond simply, clearly, and empathetically.`;

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile', // ✅ Updated to supported model
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: input },
          ],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Groq error (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      const botReply = data.choices?.[0]?.message?.content || "I'm here for you.";
      const botMessage = { sender: 'bot', text: botReply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error from Groq:', error);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Sorry, something went wrong. Please try again shortly.' },
      ]);
    } finally {
      setIsLoading(false);
      setInput('');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatContainer}>
        <h2 style={styles.header}>CounsellorGPT</h2>
        <div style={styles.chatBox}>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                ...styles.messageContainer,
                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <p
                style={{
                  ...styles.message,
                  backgroundColor: msg.sender === 'user' ? '#dcf8c6' : '#f1f0f0',
                }}
              >
                {msg.text}
              </p>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} style={styles.inputContainer}>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder={isLoading ? 'Thinking...' : 'Type your message...'}
            style={styles.input}
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={toggleListening}
            style={{
              ...styles.micButton,
              color: isListening ? 'red' : '#007bff',
            }}
            disabled={isLoading || !recognitionRef.current}
          >
            {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
          </button>
          <button type="submit" style={styles.button} disabled={isLoading}>
            {isLoading ? '...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f7f7f7',
    padding: '20px',
  },
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#fff',
    width: '100%',
    maxWidth: '900px',
    height: '85vh',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
  },
  header: {
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: '20px',
  },
  chatBox: {
    flexGrow: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    borderRadius: '10px',
    border: '1px solid #e0e0e0',
    backgroundColor: '#fafafa',
    marginBottom: '20px',
  },
  messageContainer: {
    display: 'flex',
    marginBottom: '10px',
  },
  message: {
    padding: '12px 18px',
    borderRadius: '20px',
    maxWidth: '75%',
    fontSize: '16px',
    lineHeight: '1.5',
    wordWrap: 'break-word',
  },
  inputContainer: {
    display: 'flex',
    gap: '10px',
    padding: '10px 0',
  },
  input: {
    flexGrow: 1,
    padding: '15px',
    borderRadius: '30px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  button: {
    padding: '10px 30px',
    borderRadius: '30px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
  },
  micButton: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
