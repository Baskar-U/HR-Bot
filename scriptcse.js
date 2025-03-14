// DOM Elements
import questionBank from './questionscse1.js';
const welcomeContainer = document.getElementById('welcome-container');
const interviewContainer = document.getElementById('interview-container');
const reportContainer = document.getElementById('report-container');
const codingContainer = document.getElementById('coding-container');
const userForm = document.getElementById('user-form');
const usernameInput = document.getElementById('username');
const backgroundSelect = document.getElementById('background');
const resumeUpload = document.getElementById('resume');
const resumeText = document.getElementById('resume-text');
const startBtn = document.getElementById('start-btn');
const timerElement = document.getElementById('timer');
const progressBar = document.getElementById('progress');
const codingQuizBtn = document.getElementById('coding-quiz-btn');
const userVideo = document.getElementById('user-video');
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const micBtn = document.getElementById('mic-btn');
const reportContent = document.getElementById('report-content');
const restartBtn = document.getElementById('restart-btn');
const codingTimer = document.getElementById('coding-timer');
const problemTitle = document.getElementById('problem-title');
const problemDescription = document.getElementById('problem-description');
const codeArea = document.getElementById('code-area');
const runCodeBtn = document.getElementById('run-code-btn');
const submitCodeBtn = document.getElementById('submit-code-btn');
const returnInterviewBtn = document.getElementById('return-interview-btn');

// Global variables
let username = '';
let background = '';
let resumeContent = '';
let extractedSkills = [];
let interviewDuration = 4 * 60; // 8 minutes in seconds
let remainingTime = interviewDuration;
let timerInterval;
let codingTimerInterval;
let codingRemainingTime = 2*60; // 4 minutes in seconds
let speechRecognition;
let isListening = false;
let currentQuestionIndex = 0;
let interviewScore = {
    technical: 0,
    communication: 0,
    grammar: 0,
    coding: 0,
    answers: []
};
let followupAsked = false;
let isTyping = false;
let questions = [];
let isProcessingAnswer = false;

// Initialize speech recognition
function initSpeechRecognition() {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (window.SpeechRecognition) {
        speechRecognition = new SpeechRecognition();
        speechRecognition.continuous = true;
        speechRecognition.interimResults = true;
        speechRecognition.lang = 'en-US';
        
        // Create a temporary element to show what’s being recognized
        const tempTextElement = document.createElement('div');
        tempTextElement.className = 'message user-message temp-message';
        tempTextElement.style.opacity = '0.7';

        let finalTranscript = '';
        let silenceTimeout; // Track user's silence

        speechRecognition.onresult = (event) => {
            let interimTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;

                if (event.results[i].isFinal) {
                    finalTranscript += transcript + ' ';
                    userInput.value = finalTranscript;
                } else {
                    interimTranscript += transcript;
                }
            }

            // Update the temporary text display
            if (interimTranscript !== '') {
                if (!document.body.contains(tempTextElement)) {
                    chatMessages.appendChild(tempTextElement);
                }
                tempTextElement.textContent = finalTranscript + interimTranscript;
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }

            // Detect natural pause (silence) for 3 seconds
            clearTimeout(silenceTimeout);
            silenceTimeout = setTimeout(() => {
                if (finalTranscript.trim() !== '' && userInput.value === finalTranscript) {
                    submitUserAnswer(finalTranscript);
                    finalTranscript = '';
                    userInput.value = '';

                    // Remove temporary message display
                    if (document.body.contains(tempTextElement)) {
                        chatMessages.removeChild(tempTextElement);
                    }
                }
            }, 3000); // ✅ 3 seconds of silence = User has finished answering
        };

        speechRecognition.onend = () => {
            isListening = false;
            micBtn.innerHTML = '<i class="mic-icon">🎤</i>';
            micBtn.classList.remove("active");

            // ✅ Restart recognition ONLY if bot is not speaking
            setTimeout(() => {
                if (remainingTime > 0 && !isProcessingAnswer && !window.speechSynthesis.speaking) {
                    speechRecognition.start();
                    isListening = true;
                    micBtn.innerHTML = '<i class="mic-icon">🎤 (Listening)</i>';
                    micBtn.classList.add("active");
                }
            }, 1000);
        };

        speechRecognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            micBtn.innerHTML = '<i class="mic-icon">🎤</i>';
            micBtn.classList.remove('active');

            // Restart speech recognition if interview is ongoing
            if (remainingTime > 0 && !isProcessingAnswer) {
                setTimeout(() => speechRecognition.start(), 1000);
            }
        };
    } else {
        alert('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
        micBtn.style.display = 'none';
    }
}

async function initVoiceVisualization() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        analyser.fftSize = 512; // Adjust for smoother effect
        microphone.connect(analyser);

        function updateShadow() {
            analyser.getByteFrequencyData(dataArray);
            const volume = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;

            // Map volume level to shadow intensity
            const shadowIntensity = Math.min(50, volume / 5); // Scale shadow effect
            const videoContainer = document.querySelector('.video-container');

            videoContainer.style.boxShadow = `0px 0px ${shadowIntensity}px rgba(0, 255, 0, 0.8)`;

            requestAnimationFrame(updateShadow);
        }

        updateShadow(); // Start visualization
    } catch (error) {
        console.error('Error accessing microphone:', error);
    }
}


// Handle user answer submission
function submitUserAnswer(text) {
    if (isProcessingAnswer || text.trim() === '') return;
    
    isProcessingAnswer = true;
    
    // Stop listening temporarily
    if (speechRecognition) {
        speechRecognition.stop();
    }
    
    // Add user message to chat
    addUserMessage(text);
    
    // Process response
    setTimeout(() => {
        processUserResponse(text);
        isProcessingAnswer = false;
        
        // Resume listening
        if (remainingTime > 0) {
            speechRecognition.start();
        }
    }, 1000);
}

// Initialize camera
async function initCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        userVideo.srcObject = stream;
        console.log('Camera initialized successfully');
    } catch (error) {
        console.error('Error accessing camera:', error);
        addBotMessage('I cannot access your camera. Please make sure your camera is connected and you have given permission.');
    }
}

// Timer functions
let codingQuizTriggered = false; // ✅ Prevent multiple quiz prompts

let quizTriggered = false; // ✅ Ensure quiz appears only once

function startTimer() {
    updateTimerDisplay();

    // ✅ Set random time for quiz prompt (between 1:00 and 3:00 min left)
    const quizTriggerTime = Math.floor(Math.random() * (180 - 60) + 60); // Between 1 min & 3 min

    timerInterval = setInterval(() => {
        remainingTime--;
        updateTimerDisplay();

        // ✅ Check if it's time for the quiz
        if (remainingTime === quizTriggerTime && !quizTriggered) {
            quizTriggered = true;
            waitForUserResponseThenShowQuiz(); // ✅ Wait for response before showing quiz
        }

        // ✅ Show progress bar
        const progress = (1 - remainingTime / interviewDuration) * 100;
        progressBar.style.width = `${progress}%`;

        // ✅ End interview when time is up
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            endInterview();
        }
    }, 1000);
}


function waitForUserResponseThenShowQuiz() {
    if (isProcessingAnswer) {
        // ✅ Wait until user completes response
        setTimeout(waitForUserResponseThenShowQuiz, 2000);
    } else {
        // ✅ Once response is processed, show quiz message
        showCodingQuizPrompt();
    }
}




function updateTimerDisplay() {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startCodingTimer() {
    updateCodingTimerDisplay();
    codingTimerInterval = setInterval(() => {
        codingRemainingTime--;
        updateCodingTimerDisplay();
        
        if (codingRemainingTime <= 0) {
            clearInterval(codingTimerInterval);
            submitCodingSolution();
        }
    }, 1000);
}

function updateCodingTimerDisplay() {
    const minutes = Math.floor(codingRemainingTime / 60);
    const seconds = codingRemainingTime % 60;
    codingTimer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Message handling
function addBotMessage(text, delay = 0, speak = true) {
    if (!text || text.trim() === "") return; // Prevent empty messages

    // Add typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';
    typingIndicator.innerHTML = '<span></span><span></span><span></span>';
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    setTimeout(() => {
        chatMessages.removeChild(typingIndicator); // Ensure it gets removed
        
        // Create message container
        const messageElement = document.createElement('div');
        messageElement.className = 'message bot-message';
        
        // ✅ Bot's Name (Header)
        const botNameElement = document.createElement('div');
        botNameElement.className = 'message-name';
        botNameElement.textContent = "MockVox";

        // ✅ Message Text (Typing Effect)
        const messageTextElement = document.createElement('div');
        messageTextElement.className = 'message-text';
        
        messageElement.appendChild(botNameElement); // Add Bot name
        messageElement.appendChild(messageTextElement); // Add text container
        
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        let i = 0;
        isTyping = true;

        const typingEffect = setInterval(() => {
            if (i < text.length) {
                messageTextElement.textContent += text.charAt(i);
                i++;
                chatMessages.scrollTop = chatMessages.scrollHeight;
            } else {
                clearInterval(typingEffect);
                isTyping = false; // Reset typing state

                if (speak) {
                    speakText(text);
                }
            }
        }, 20);
    }, delay);
}



function addUserMessage(text) {
    if (!text || text.trim() === "") return; // Prevent empty messages

    // Create message container
    const messageElement = document.createElement('div');
    messageElement.className = 'message user-message';

    // ✅ User's Name (Header)
    const userNameElement = document.createElement('div');
    userNameElement.className = 'message-name';
    userNameElement.textContent = username; // Uses the global username variable

    // ✅ Message Text
    const messageTextElement = document.createElement('div');
    messageTextElement.className = 'message-text';
    messageTextElement.textContent = text;

    // Append elements
    messageElement.appendChild(userNameElement); // Add User name
    messageElement.appendChild(messageTextElement); // Add text container

    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Analyze message for scoring
    analyzeUserResponse(text);
}


function speakText(text, callback = null) {
    if ('speechSynthesis' in window) {
        speechRecognition.stop(); // ✅ Stop recognition while bot speaks
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.volume = 1;

        utterance.onend = () => {
            setTimeout(() => {
                if (callback) callback();
                startListening(); // ✅ Only show next message after bot finishes speaking
            }, 1000); // ✅ Small delay before next message
        };

        window.speechSynthesis.speak(utterance);
    }
}



// Skills extraction
function extractSkillsFromResume(text) {
    const commonSkills = [
        'JavaScript', 'Python', 'Java', 'C++', 'C', 'PHP', 'Swift', 'TypeScript',
        'React', 'Angular', 'Vue', 'Node.js', 'Express', 'Django', 'Flask', 'Spring',
        'SQL', 'MongoDB', 'Firebase', 'AWS', 'Azure', 'Google Cloud', 'Docker',
        'HTML', 'CSS', 'SASS', 'Bootstrap', 'Tailwind', 'jQuery', 'Redux', 'GraphQL',
        'Git', 'CI/CD', 'Agile', 'DevOps', 'Machine Learning', 'Data Science',
        'Full Stack', 'Frontend', 'Backend', 'Mobile Development', 'iOS', 'Android',
        'UI/UX', 'Design', 'Project Management', 'Product Management',
        'SEO', 'Analytics', 'Leadership'
    ];
    
    const foundSkills = [];
    const textLower = text.toLowerCase();
    
    commonSkills.forEach(skill => {
        if (textLower.includes(skill.toLowerCase())) {
            foundSkills.push(skill);
        }
    });
    
    // If no skills found, add some default ones based on background
    if (foundSkills.length === 0) {
        if (background === 'CSE') {
            foundSkills.push('JavaScript', 'HTML', 'CSS', 'Python', 'Data Structures');
        } else if (background === 'MBA') {
            foundSkills.push('Project Management', 'Leadership', 'Marketing', 'Finance', 'Business Strategy');
        } else {
            foundSkills.push('Communication', 'Problem Solving', 'Teamwork', 'Critical Thinking');
        }
    }
    
    return foundSkills;
}



function addBotMessageWithButton(text, buttonText, buttonId, buttonAction) {
    // Create message container
    const messageElement = document.createElement('div');
    messageElement.className = 'message bot-message';

    // Create bot's name
    const botNameElement = document.createElement('div');
    botNameElement.className = 'message-name';
    botNameElement.textContent = "MockVox";

    // Create message text
    const messageTextElement = document.createElement('div');
    messageTextElement.className = 'message-text';
    messageTextElement.textContent = text;

    // Create the button
    const buttonElement = document.createElement('button');
    buttonElement.id = buttonId;
    buttonElement.textContent = buttonText;
    buttonElement.className = "coding-quiz-btn"; // Add CSS class for styling
    buttonElement.onclick = buttonAction; // Assign action function

    // Append elements
    messageElement.appendChild(botNameElement);
    messageElement.appendChild(messageTextElement);
    messageElement.appendChild(buttonElement); // Append the button

    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
function showCodingQuizPrompt() {
    addBotMessageWithButton(
        "Attempt the quiz by clicking this button:",
        "Start Coding Quiz",
        "coding-quiz-btn",
        startCodingQuiz
    );
}

// Technical questions based on skills
function generateTechnicalQuestions() {
    const questions = [];
    const followUpMessages = [
        "Can you provide more details or examples about that?",
        "Could you elaborate on your experience with this?",
        "Have you encountered any challenges while working with this? How did you overcome them?",
        "Can you share a real-world project where you applied this?",
        "What best practices do you follow when working with this?",
        "How would you explain this concept to a beginner?",
        "Have you explored any advanced concepts related to this? If so, what?",
        "How do you compare this with alternative technologies or approaches?",
        "Can you describe a situation where this skill helped you solve a problem?",
        "What improvements would you suggest for this technology or approach?"
    ];

    // Store selected questions to avoid duplicates
    const usedQuestions = new Set();

    extractedSkills.forEach(skill => {
        if (questionBank[skill]) {
            let availableQuestions = questionBank[skill].filter(q => !usedQuestions.has(q.question));

            if (availableQuestions.length > 0) {
                let randomIndex = Math.floor(Math.random() * availableQuestions.length);
                let selectedQuestion = availableQuestions[randomIndex];

                // Mark this question as used
                usedQuestions.add(selectedQuestion.question);

                // Assign a random follow-up message
                let randomFollowUp = followUpMessages[Math.floor(Math.random() * followUpMessages.length)];

                questions.push({
                    skill: skill,
                    question: selectedQuestion.question,
                    answer: selectedQuestion.answer, // ✅ Keep answer for later comparison
                    followup: randomFollowUp
                });
            }
        }
    });

    // ✅ Ensure at least 5 questions are included
    while (questions.length < 5 && questionBank['Default']) {
        let availableDefaultQuestions = questionBank['Default'].filter(q => !usedQuestions.has(q.question));

        if (availableDefaultQuestions.length > 0) {
            let randomIndex = Math.floor(Math.random() * availableDefaultQuestions.length);
            let selectedQuestion = availableDefaultQuestions[randomIndex];

            // Mark this question as used
            usedQuestions.add(selectedQuestion.question);

            questions.push({
                skill: 'General',
                question: selectedQuestion.question,
                answer: selectedQuestion.answer, // ✅ Keep answer for later comparison
                followup: "Can you provide more details or examples about that?"
            });
        }
    }

    return questions;
}


// Coding challenges
const codingChallenges = [
    {
        title: "Two Sum Problem",
        description: "Write a function that takes an array of numbers and a target number. The function should find and return the indices of the two numbers that add up to the target. You can assume there is exactly one solution.",
        template: "function twoSum(nums, target) {\n    // Your code here\n}\n\n// Example usage:\n// twoSum([2, 7, 11, 15], 9) should return [0, 1]",
        solution: "function twoSum(nums, target) {\n    const map = {};\n    \n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        \n        if (map[complement] !== undefined) {\n            return [map[complement], i];\n        }\n        \n        map[nums[i]] = i;\n    }\n    \n    return [];\n}"
    },
    {
        title: "Palindrome Check",
        description: "Write a function that checks if a given string is a palindrome (reads the same backward as forward). Ignore all non-alphanumeric characters and consider case-insensitive comparison.",
        template: "function isPalindrome(str) {\n    // Your code here\n}\n\n// Example usage:\n// isPalindrome('A man, a plan, a canal: Panama') should return true",
        solution: "function isPalindrome(str) {\n    const cleaned = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();\n    \n    for (let i = 0; i < cleaned.length / 2; i++) {\n        if (cleaned[i] !== cleaned[cleaned.length - 1 - i]) {\n            return false;\n        }\n    }\n    \n    return true;\n}"
    },
    {
        title: "FizzBuzz Challenge",
        description: "Write a function that prints numbers from 1 to n. For multiples of 3, print 'Fizz' instead of the number. For multiples of 5, print 'Buzz'. For numbers that are multiples of both 3 and 5, print 'FizzBuzz'.",
        template: "function fizzBuzz(n) {\n    // Your code here\n}\n\n// Example usage:\n// fizzBuzz(15)",
        solution: "function fizzBuzz(n) {\n    const result = [];\n    \n    for (let i = 1; i <= n; i++) {\n        if (i % 3 === 0 && i % 5 === 0) {\n            result.push('FizzBuzz');\n        } else if (i % 3 === 0) {\n            result.push('Fizz');\n        } else if (i % 5 === 0) {\n            result.push('Buzz');\n        } else {\n            result.push(i);\n        }\n    }\n    \n    return result;\n}"
    }
];

// Analysis functions
function analyzeUserResponse(text) {
    // Grammar analysis
    const grammarScore = analyzeGrammar(text);
    
    // Communication analysis
    const communicationScore = analyzeCommunication(text);
    
    // Technical analysis
    const technicalScore = analyzeTechnical(text, currentQuestionIndex);
    
    // Update overall scores
    interviewScore.grammar = (interviewScore.grammar * interviewScore.answers.length + grammarScore) / (interviewScore.answers.length + 1);
    interviewScore.communication = (interviewScore.communication * interviewScore.answers.length + communicationScore) / (interviewScore.answers.length + 1);
    interviewScore.technical = (interviewScore.technical * interviewScore.answers.length + technicalScore) / (interviewScore.answers.length + 1);
    
    // Store answer
    interviewScore.answers.push({
        question: questions[currentQuestionIndex].question,
        answer: text,
        scores: {
            grammar: grammarScore,
            communication: communicationScore,
            technical: technicalScore
        }
    });
}

// Mock grammar analysis (would be replaced with a more sophisticated model in production)
function analyzeGrammar(text) {
    let score = 100;
    
    // Simple checks
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    // Penalize for very short sentences
    if (sentences.length === 0 || (sentences.length === 1 && sentences[0].split(' ').length < 5)) {
        score -= 30;
    }
    
    // Check for capitalization at the beginning of sentences
    sentences.forEach(sentence => {
        const trimmed = sentence.trim();
        if (trimmed.length > 0 && trimmed[0] !== trimmed[0].toUpperCase()) {
            score -= 5;
        }
    });
    
    // Check for common grammatical errors
    const commonErrors = [
        { pattern: /\b(i|im)\b/g, correct: 'I' }, // Lowercase 'i'
        { pattern: /\byour\b(?=\s+(is|are|was|were))/g, correct: "you're" }, // your vs you're
        { pattern: /\btheir\b(?=\s+(is|are|was|were))/g, correct: "they're" }, // their vs they're
        { pattern: /\bits\b(?=\s+(is|are|was|were))/g, correct: "it's" }, // its vs it's
        { pattern: /\b(dont|cant|wont|shouldnt|wouldnt|couldnt)\b/g, correct: "contraction missing apostrophe" }
    ];
    
    commonErrors.forEach(error => {
        if (error.pattern.test(text.toLowerCase())) {
            score -= 5;
        }
    });
    

    // Penalty for repeated words
    const words = text.toLowerCase().split(/\s+/);
    for (let i = 1; i < words.length; i++) {
        if (words[i].length > 3 && words[i] === words[i-1]) {
            score -= 5;
        }
    }
    
    return Math.max(Math.min(score, 100), 0); // Ensure score is between 0 and 100
}

// Mock communication analysis
function analyzeCommunication(text) {
    let score = 80; // Start with a baseline score
    
    // Length of response
    const wordCount = text.split(/\s+/).length;
    if (wordCount < 10) {
        score -= 30; // Too short
    } else if (wordCount > 10 && wordCount < 30) {
        score += 5; // Good length
    } else if (wordCount > 100) {
        score -= 10; // Too verbose
    }
    
    // Clarity indicators
    const clarityPhrases = [
        "for example", "such as", "to illustrate", "specifically",
        "in other words", "to clarify", "this means", "in summary"
    ];
    
    for (const phrase of clarityPhrases) {
        if (text.toLowerCase().includes(phrase)) {
            score += 5;
        }
    }
    
    // Use of filler words
    const fillerWords = [
        "um", "uh", "like", "you know", "sort of", "kind of", "basically",
        "actually", "literally", "stuff", "things"
    ];
    
    let fillerCount = 0;
    for (const word of fillerWords) {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        const matches = text.match(regex);
        if (matches) {
            fillerCount += matches.length;
        }
    }
    
    if (fillerCount > 3) {
        score -= 5 * Math.min(fillerCount, 5);
    }
    
    return Math.max(Math.min(score, 100), 0); // Ensure score is between 0 and 100
}

// Mock technical answer evaluation
function analyzeTechnical(userText, questionIndex) {
    if (!questions[questionIndex] || !questions[questionIndex].answer) return 50; // Default score if question or answer is missing

    const correctAnswer = questions[questionIndex].answer.toLowerCase();

    // ✅ Normalize text: Remove punctuation & split into words
    const tokenize = (text) => text.replace(/[.,!?]/g, '').toLowerCase().split(/\s+/);

    const userWords = tokenize(userText);
    const correctWords = tokenize(correctAnswer);

    // ✅ Calculate word overlap (how many words match)
    let matchedWords = userWords.filter(word => correctWords.includes(word)).length;
    let similarityScore = (matchedWords / correctWords.length) * 100;

    // ✅ Set base score
    let score = 50; 

    // ✅ Adjust score based on similarity
    if (similarityScore > 80) {
        score += 40; // Very close match
    } else if (similarityScore > 60) {
        score += 25;
    } else if (similarityScore > 40) {
        score += 15;
    } else if (similarityScore > 20) {
        score += 5;
    } else {
        score -= 10; // Poor match
    }

    // ✅ Consider length of response (short answers might not be sufficient)
    if (userWords.length < 5) {
        score -= 20; // Too short
    } else if (userWords.length > 50) {
        score += 10; // Well-explained answer
    }

    // ✅ Ensure score is between 0 and 100
    return Math.max(Math.min(score, 100), 0);
}


// Process user response and determine next steps
function processUserResponse(text) {
    const currentQuestion = questions[currentQuestionIndex];
    const technicalScore = analyzeTechnical(text, currentQuestionIndex);
    const correctAnswer = currentQuestion.answer.toLowerCase();
    const userResponse = text.trim().toLowerCase();

    // ✅ Tokenization: Split words from user & correct answer
    const answerWords = correctAnswer.split(/\s+/);
    const userWords = userResponse.split(/\s+/);

    // ✅ Calculate match percentage
    let wordsMatched = userWords.filter(word => answerWords.includes(word)).length;
    let matchScore = (wordsMatched / answerWords.length) * 100;

    // ✅ Compliments based on score (Randomized)
    const compliments = {
        high: [
            "🌟 Excellent answer! You covered almost everything perfectly!",
            "🔥 Amazing response! Your knowledge really shines!",
            "🎯 Spot on! That was a fantastic explanation!",
            "💡 Brilliant! You nailed the key concepts effortlessly!",
            "🎓 Outstanding! You explained that like a true expert.",
            "🚀 Superb response! You clearly have a deep understanding.",
            "🌟 That was one of the best answers so far! Keep it up!",
            "💎 Exceptional! Your clarity and detail are impressive.",
            "🏆 You're on another level! That was a masterful explanation.",
            "✅ 100% correct! You really know your stuff!",
            "⚡ Wow! That was an incredibly well-thought-out answer.",
            "🔬 Great depth! You covered both theory and real-world applications.",
            "🔝 Fantastic work! You structured your response perfectly.",
            "✨ Impressive! You made a complex topic sound easy.",
            "🏅 Gold standard response! That was very well explained.",
            "🎤 Mic drop! You absolutely nailed that question.",
            "📚 Your knowledge is strong, and your explanation was crystal clear!",
            "💯 Full marks for that answer! You left no room for doubt.",
            "🚀 High-level response! This shows strong technical expertise.",
            "🧠 Genius! That answer demonstrated your deep understanding."
        ],
        medium: [
            "💡 Great job! Your answer is well-structured, but you can add a bit more detail.",
            "👏 Nice work! You got most of it right. A little more depth would make it even better.",
            "✨ Good response! You have a strong grasp, keep refining your explanations.",
            "👍 Solid answer! Just expand on a few points to make it even stronger.",
            "🎯 Almost there! You're doing great, just a little more refinement needed.",
            "🔍 Good explanation! Maybe provide an example to make it even clearer.",
            "📌 You've got the right idea! A bit more technical detail would be helpful.",
            "🚦 You're on the right path! Try to add some real-world applications.",
            "🔗 Well-structured response! Adding a bit more logic would make it even better.",
            "📝 Good work! If you elaborate a bit more, it'll be even stronger.",
            "💭 Your thoughts are well-organized! Just back it up with some examples.",
            "🎵 Great rhythm in your explanation! Adding an analogy might help clarify further.",
            "🔎 Nice breakdown of the topic! Try to link it to related concepts.",
            "🚀 You're progressing well! A little more confidence will make it even better.",
            "📖 You explained the core idea well! Consider mentioning best practices.",
            "⚡ Good explanation! If you connect it to a real-world scenario, it will stand out.",
            "🔬 Logical and well-thought-out! A bit more detail would make it exceptional.",
            "🏗 Good foundation! Just add some depth to solidify your point.",
            "🎯 Almost a bullseye! A bit more clarity, and you'll hit the mark.",
            "🛠 Solid answer! Fine-tune it with technical insights for a perfect response."
        ],
        average: [
            "👍 Good attempt! You're on the right track, let's dive a little deeper.",
            "✅ Decent response! Some points are correct, but try to elaborate more.",
            "🤔 Not bad! With a bit more clarity, this could be a strong answer.",
            "🔍 You're getting there! A bit more detail will help refine your explanation.",
            "🔄 Keep going! You're close to a great answer, just add more structure.",
            "⚡ You’ve got potential! A few refinements will make this answer shine.",
            "🛤 You’re on the right path! Try rephrasing for more precision.",
            "🎭 Good effort! A little more confidence in your explanation would help.",
            "🔄 Almost there! Try to focus on key technical points for a stronger impact.",
            "🧩 Nice attempt! If you can connect different concepts, it will be stronger.",
            "🔎 Your response is forming well! Keep building on that knowledge.",
            "📚 Decent try! Try to recall similar concepts to reinforce your answer.",
            "🚀 You're improving! Add specific details to enhance your response.",
            "🎯 You have the basic idea! Expanding on it will make your answer more complete.",
            "🔄 Good try! Now, refine it with some key terms and structured thinking.",
            "💬 You're thinking in the right direction! Just be more concise and precise.",
            "🔬 You’ve captured part of the idea! Strengthen it with an example.",
            "📖 A little more reading on this topic, and you'll have a perfect answer!",
            "📝 Not bad at all! If you provide some real-world use cases, it will be stronger.",
            "🛠 Your understanding is there! Work on refining how you explain it."
        ],
        low: [
            "🤔 That's an interesting take! Let's move to the next one.",
            "🔄 No worries! Let's keep learning and move on to the next question.",
            "📖 Keep practicing! You'll get better with more attempts.",
            "🚀 Learning is a journey! Let's try another one and keep improving.",
            "🎯 You're trying, and that's what matters! Keep at it!",
            "📌 This is a great chance to improve! Keep challenging yourself.",
            "⚡ It's okay! Every attempt brings you closer to mastery.",
            "🌱 Mistakes are part of learning! Keep pushing forward.",
            "🔗 You're on the learning curve! Don't stop, and it'll click soon.",
            "📚 No stress! Let’s move on and revisit this concept later.",
            "💡 Keep thinking! The more you try, the better you'll understand.",
            "🔎 Keep exploring! You'll find the right way to explain it with practice.",
            "🔧 It’s a work in progress! Try looking at similar questions for guidance.",
            "🚦 Not quite there, but you're moving forward. Keep at it!",
            "🛤 Everyone starts somewhere! Keep practicing, and it'll get easier.",
            "🎵 You're warming up! Keep going, and soon you'll master this.",
            "🔄 That was a good effort! Let's focus on the next question.",
            "🔍 Let’s shift gears and try another one!",
            "📝 Don't worry! Every expert was once a beginner too.",
            "🏗 This is a stepping stone! Every challenge helps you grow."
        ]
    };
    

    // ✅ Select a random compliment based on score range
    let compliment;
    if (technicalScore > 80) {
        compliment = compliments.high[Math.floor(Math.random() * compliments.high.length)];
    } else if (technicalScore > 60) {
        compliment = compliments.medium[Math.floor(Math.random() * compliments.medium.length)];
    } else if (technicalScore > 50) {
        compliment = compliments.average[Math.floor(Math.random() * compliments.average.length)];
    } else {
        compliment = compliments.low[Math.floor(Math.random() * compliments.low.length)];
    }

    // ✅ Uncertainty handling
    const uncertainResponses = [
        "i don't know", "i am not sure", "i have no idea",
        "i'm unsure", "not sure", "no clue", "i can't answer that"
    ];

    const encouragementMessages = [
        "No worries! Keep going, you'll get better. Here's another question:",
        "It's okay! Learning takes time. Let's try this question instead:",
        "Don't worry, you'll get it next time! How about this question:",
        "That's fine! Every expert was once a beginner. Try answering this:",
        "No stress! You're doing great. Here's another question for you:"
    ];

    // ✅ Handle "I don't know" BEFORE checking score
    if (uncertainResponses.some(response => text.toLowerCase().includes(response))) {
        const randomEncouragement = encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)];
        addBotMessage(randomEncouragement);

        // ✅ Move to the next question
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length && remainingTime > 0) {
                addBotMessage(questions[currentQuestionIndex].question);
            } else {
                addBotMessage("Great effort! We've completed all the technical questions. Let's talk more about your background.");
                setTimeout(() => askRandomGeneralQuestion(), 2000);
            }
        }, 2000);

        return;
    }

    // ✅ Follow-up logic for average answers
    if (technicalScore === 50) {
        setTimeout(() => {
            addBotMessage(compliment + " " + currentQuestion.followup);
        }, 1000);
        return;
    }

    // ✅ Move to the next question for good/poor answers
    addBotMessage(compliment);
    
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length && remainingTime > 0) {
            addBotMessage("Here's your next question: " + questions[currentQuestionIndex].question);
        } else {
            addBotMessage("That wraps up the technical round! Now, let's talk about your experience.");
            setTimeout(() => askRandomGeneralQuestion(), 2000);
        }
    }, 2000);
}

// Start coding quiz
function startCodingQuiz() {
    clearInterval(timerInterval); // Pause main interview timer
    interviewContainer.classList.add('hidden');
    codingContainer.classList.remove('hidden');
    
    // Select a random coding challenge
    const challenge = codingChallenges[Math.floor(Math.random() * codingChallenges.length)];
    problemTitle.textContent = `Problem: ${challenge.title}`;
    problemDescription.textContent = challenge.description;
    codeArea.value = challenge.template;
    
    // Start coding timer
    startCodingTimer();
}

// Submit coding solution
let askedQuestions = new Set(); // Track asked questions

function askRandomGeneralQuestion() {
    if (remainingTime <= 0) {
        endInterview();
        return;
    }

    // ✅ Check if all questions are asked
    if (askedQuestions.size >= generalQuestions.length) {
        addBotMessage("That was a great conversation! We've covered everything. Thank you for your time! 😊");
        setTimeout(() => endInterview(), 3000);
        return;
    }

    // ✅ Pick a random question that hasn't been asked
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * generalQuestions.length);
    } while (askedQuestions.has(randomIndex));

    askedQuestions.add(randomIndex);

    // ✅ Ask the question
    addBotMessage(generalQuestions[randomIndex]);

    // ✅ Wait for user's response before proceeding
    handleUserResponse(userResponse);
}

// ✅ Function to handle user response
function handleUserResponse(userResponse) {
    if (remainingTime <= 0) {
        endInterview();
        return;
    }

    // ✅ Give a random compliment
    const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];
    addBotMessage(randomCompliment);

    // ✅ Ask the next question after a short delay
    setTimeout(() => {
        askRandomGeneralQuestion();
    }, 2000);
}

// ✅ Function to wait for user response
function waitForUserResponse(callback) {
    let checkResponse = setInterval(() => {
        if (userResponseReceived) {
            clearInterval(checkResponse);
            callback(userResponseReceived); // Process the response
            userResponseReceived = null; // Reset for next question
        }
    }, 500);
}


// Start the process after the coding section
function submitCodingSolution() {
    clearInterval(codingTimerInterval);

    // Random score between 50-90
    const randomScore = Math.floor(Math.random() * 41) + 50;
    interviewScore.coding = randomScore;

    // Hide coding container and continue interview
    codingContainer.classList.add('hidden');

    if (remainingTime > 0) {
        interviewContainer.classList.remove('hidden');
        addBotMessage("I've recorded your coding solution. Let's continue with the interview.");
        startTimer();
        
        // Start the question-response loop
        setTimeout(() => {
            askRandomGeneralQuestion();
        }, 2000);
    } else {
        endInterview();
    }
}


// End interview and show report
function endInterview() {
    // Stop all timers and speech recognition
    clearInterval(timerInterval);
    clearInterval(codingTimerInterval);
    
    if (speechRecognition) {
        speechRecognition.stop();
    }
    
    // Hide all containers except report
    welcomeContainer.classList.add('hidden');
    interviewContainer.classList.add('hidden');
    codingContainer.classList.add('hidden');
    reportContainer.classList.remove('hidden');
    
    // Stop all media streams
    if (userVideo.srcObject) {
        userVideo.srcObject.getTracks().forEach(track => track.stop());
    }
    
    // Generate report
    addBotMessage("I am generating your interview report now...");
    setTimeout(generateReport, 2000);
}

// Generate interview report
function generateReport() {
    const technical = Math.round(interviewScore.technical);
    const communication = Math.round(interviewScore.communication);
    const grammar = Math.round(interviewScore.grammar);
    const coding = interviewScore.coding;
    const overall = Math.round((technical + communication + grammar + coding) / 4);

    let reportHTML = `
        <div class="report-section">
            <h3>Overall Score: <span id="overall-score">0%</span></h3>
            <div class="score-bar"><div class="score-fill" id="overall-bar"></div></div>
            <p>Thank you for completing your interview, ${username}!</p>
        </div>

        <div class="report-section">
            <h3>Technical Knowledge: <span id="technical-score">0%</span></h3>
            <div class="score-bar"><div class="score-fill" id="technical-bar"></div></div>
            <p>${getTechnicalFeedback(technical)}</p>
        </div>

        <div class="report-section">
            <h3>Communication Skills: <span id="communication-score">0%</span></h3>
            <div class="score-bar"><div class="score-fill" id="communication-bar"></div></div>
            <p>${getCommunicationFeedback(communication)}</p>
        </div>

        <div class="report-section">
            <h3>Grammar & Language: <span id="grammar-score">0%</span></h3>
            <div class="score-bar"><div class="score-fill" id="grammar-bar"></div></div>
            <p>${getGrammarFeedback(grammar)}</p>
        </div>

        <div class="report-section">
            <h3>Coding Challenge: <span id="coding-score">0%</span></h3>
            <div class="score-bar"><div class="score-fill" id="coding-bar"></div></div>
            <p>${getCodingFeedback(coding)}</p>
        </div>

        <div class="report-section">
            <h3>Question Analysis</h3>
            <div class="text-analysis">
    `;

    // Add question analysis
    interviewScore.answers.forEach((item, index) => {
        reportHTML += `
            <p><strong>Q${index + 1}:</strong> ${item.question}</p>
            <p><em>Your answer:</em> ${item.answer}</p>
            <p><strong>Score:</strong> Technical: ${Math.round(item.scores.technical)}%, Communication: ${Math.round(item.scores.communication)}%</p>
            <hr ${index === interviewScore.answers.length - 1 ? 'class="hidden"' : ''}>
        `;
    });

    reportHTML += `
            </div>
        </div>

        <div class="report-section">
            <h3>Improvement Tips</h3>
            <ul>
                ${getImprovementTips(technical, communication, grammar, coding)}
            </ul>
        </div>
    `;

    reportContent.innerHTML = reportHTML;

    // Animate the score increase
    animateScore("overall-score", "overall-bar", overall);
    animateScore("technical-score", "technical-bar", technical);
    animateScore("communication-score", "communication-bar", communication);
    animateScore("grammar-score", "grammar-bar", grammar);
    animateScore("coding-score", "coding-bar", coding);
}

// Function to animate score increase
function animateScore(scoreId, barId, finalScore) {
    let currentScore = 0;
    const increment = finalScore / 50; // Gradual increase in 50 steps
    const scoreElement = document.getElementById(scoreId);
    const barElement = document.getElementById(barId);

    const interval = setInterval(() => {
        currentScore += increment;
        if (currentScore >= finalScore) {
            currentScore = finalScore;
            clearInterval(interval);
        }
        scoreElement.innerText = `${Math.round(currentScore)}%`;
        barElement.style.width = `${Math.round(currentScore)}%`;
    }, 20); // Update every 20ms for a smooth effect
}


// Feedback generator functions
function getTechnicalFeedback(score) {
    if (score >= 90) {
        return "Excellent technical knowledge! You demonstrated thorough understanding of concepts and applied them appropriately.";
    } else if (score >= 75) {
        return "Good technical knowledge. You showed solid understanding of most concepts discussed.";
    } else if (score >= 60) {
        return "Acceptable technical knowledge. Consider deepening your understanding of key concepts in your field.";
    } else {
        return "Your technical responses need improvement. We recommend further study and practice with core concepts.";
    }
}

function getCommunicationFeedback(score) {
    if (score >= 90) {
        return "Excellent communication skills! You expressed ideas clearly and concisely.";
    } else if (score >= 75) {
        return "Good communication skills. Your responses were generally clear and well-structured.";
    } else if (score >= 60) {
        return "Acceptable communication. Focus on organizing your thoughts more clearly and using examples.";
    } else {
        return "Your communication needs improvement. Practice expressing technical concepts more clearly and concisely.";
    }
}

function getGrammarFeedback(score) {
    if (score >= 90) {
        return "Excellent grammar and language usage. Your responses were professionally phrased.";
    } else if (score >= 75) {
        return "Good grammar and language skills with minor areas for improvement.";
    } else if (score >= 60) {
        return "Acceptable grammar. Pay attention to sentence structure and word choice.";
    } else {
        return "Your grammar and language need improvement. Consider practicing professional communication.";
    }
}

function getCodingFeedback(score) {
    if (score >= 90) {
        return "Excellent coding skills! Your solution was efficient and well-implemented.";
    } else if (score >= 75) {
        return "Good coding skills. Your solution addressed the core problem effectively.";
    } else if (score >= 60) {
        return "Acceptable coding solution. Consider improving code organization and efficiency.";
    } else {
        return "Your coding solution needs improvement. Focus on algorithm design and coding best practices.";
    }
}

function getImprovementTips(technical, communication, grammar, coding) {
    const tips = [];
    
    if (technical < 70) {
        tips.push("Review core technical concepts in your field and practice explaining them clearly.");
        tips.push("Work on more projects to gain practical experience with the technologies you're using.");
    }
    
    if (communication < 70) {
        tips.push("Practice structuring your responses with a clear beginning, middle, and conclusion.");
        tips.push("Use specific examples to illustrate points rather than general statements.");
    }
    
    if (grammar < 70) {
        tips.push("Review basic grammar rules and practice professional communication.");
        tips.push("Consider using tools like Grammarly to check your written communication.");
    }
    
    if (coding < 70) {
        tips.push("Practice coding challenges regularly on platforms like LeetCode or HackerRank.");
        tips.push("Study algorithm design and data structures to improve problem-solving skills.");
    }
    
    // Add general tips if performing well in all areas
    if (technical >= 70 && communication >= 70 && grammar >= 70 && coding >= 70) {
        tips.push("Continue building your portfolio with diverse projects.");
        tips.push("Consider learning additional technologies to expand your skill set.");
        tips.push("Practice mock interviews regularly to maintain your interview skills.");
    }
    
    let tipsHTML = "";
    tips.forEach(tip => {
        tipsHTML += `<li>${tip}</li>`;
    });
    
    return tipsHTML;
}

function startListening() {
    if (!speechRecognition) return;

    // ✅ Prevents mic from turning on while bot is speaking
    if (window.speechSynthesis.speaking) {
        setTimeout(startListening, 500); // Check again after 0.5 seconds
        return;
    }

    speechRecognition.start();
    isListening = true;
    micBtn.innerHTML = '<i class="mic-icon">🎤 (Listening)</i>';
    micBtn.classList.add("active");

    let finalTranscript = "";
    let silenceTimeout; // Track user's silence

    speechRecognition.onresult = (event) => {
        let interimTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;

            if (event.results[i].isFinal) {
                finalTranscript += transcript + " ";
                userInput.value = finalTranscript;
            } else {
                interimTranscript += transcript;
            }
        }

        // ✅ Detect when user is silent for 3 seconds
        clearTimeout(silenceTimeout);
        silenceTimeout = setTimeout(() => {
            if (finalTranscript.trim() !== "" && userInput.value === finalTranscript) {
                submitUserAnswer(finalTranscript);
                finalTranscript = "";
                userInput.value = "";
            }
        }, 3000); // ✅ 3 seconds of silence = User has finished answering
    };

    speechRecognition.onend = () => {
        isListening = false;
        micBtn.innerHTML = '<i class="mic-icon">🎤</i>';
        micBtn.classList.remove("active");

        // ✅ Restart recognition ONLY if bot is not speaking
        setTimeout(() => {
            if (remainingTime > 0 && !isProcessingAnswer && !window.speechSynthesis.speaking) {
                speechRecognition.start();
                isListening = true;
                micBtn.innerHTML = '<i class="mic-icon">🎤 (Listening)</i>';
                micBtn.classList.add("active");
            }
        }, 1000);
    };

    speechRecognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        micBtn.innerHTML = '<i class="mic-icon">🎤</i>';
        micBtn.classList.remove("active");

        // ✅ Restart speech recognition if the interview is ongoing
        if (remainingTime > 0 && !isProcessingAnswer) {
            setTimeout(() => speechRecognition.start(), 1000);
        }
    };
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Form submission
    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        username = usernameInput.value.trim();
        background = backgroundSelect.value;
        
        if (resumeUpload.files.length > 0) {
            const file = resumeUpload.files[0];
            const reader = new FileReader();
            
            reader.onload = (e) => {
                resumeContent = e.target.result;
                startInterview();
            };
            
            reader.readAsText(file);
        } else if (resumeText.value.trim() !== '') {
            resumeContent = resumeText.value.trim();
            startInterview();
        } else {
            alert('Please either upload a resume file or paste your resume text.');
        }
    });
    
    function startInterview() {
        welcomeContainer.classList.add('hidden');
        interviewContainer.classList.remove('hidden');
    
        // Extract skills from resume
        extractedSkills = extractSkillsFromResume(resumeContent);
    
        // Generate questions based on skills
        questions = generateTechnicalQuestions();
    
        if (!questions || questions.length === 0) {
            console.error("No questions generated.");
            addBotMessage("Oops! No questions were generated. Please check your resume and try again.", 0, true);
            return;
        }
    
        // ✅ Initialize camera, voice visualization, and speech recognition
        initCamera();
        initSpeechRecognition();
        initVoiceVisualization();
    
        const welcomeMessages = [
            `Hello ${username}! Welcome to your technical interview simulation. Let's get started!`,
            `Hi ${username}, great to have you here! Let's begin your interview practice.`,
            `Welcome ${username}! Get ready for an engaging technical interview experience.`,
            `Hey ${username}! Ready to sharpen your interview skills? Let's go!`,
            `Hello ${username}! This interview simulation is designed to challenge and improve you. Let's start!`,
            `Hi there, ${username}! Let's dive into your technical interview preparation!`,
            `Welcome, ${username}! Excited to test your knowledge today? Let's begin!`,
            `Hey ${username}! You're in the right place for some great technical questions. Let's start!`,
            `Hello ${username}! Let's make this a valuable interview practice session. Ready?`,
            `Hi ${username}! Get ready for an insightful and interactive interview simulation!`
        ];
    
        function getRandomWelcomeMessage(username) {
            return welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
        }
    
        // ✅ Step 1: Speak and display the welcome message
        setTimeout(() => {
            const welcomeMessage = getRandomWelcomeMessage(username);
            speakText(welcomeMessage);
            addBotMessage(welcomeMessage, 0, false);
        }, 1000);
    
        // ✅ Step 2: Speak and display skills message after welcome message is spoken
        setTimeout(() => {
            const skillMessages = [
                `I notice you have experience with ${extractedSkills.join(', ')}. That's impressive!`,
                `Your knowledge in ${extractedSkills.join(', ')} really stands out!`,
                `Having expertise in ${extractedSkills.join(', ')} is a great asset!`,
                `I see you’re skilled in ${extractedSkills.join(', ')}. That’s fantastic!`,
                `Your proficiency in ${extractedSkills.join(', ')} is truly remarkable!`,
                `Wow! ${extractedSkills.join(', ')} is a strong skill to have!`,
                `It's great that you have experience in ${extractedSkills.join(', ')}!`,
                `I like that you're experienced in ${extractedSkills.join(', ')}.`,
                `Your background in ${extractedSkills.join(', ')} is quite valuable.`,
                `I'm impressed by your skills in ${extractedSkills.join(', ')}!`
            ];
            const randomMessage = skillMessages[Math.floor(Math.random() * skillMessages.length)];
            addBotMessage(randomMessage, 0, false);
        }, 5000); // ✅ Fixed skills message
    
        // ✅ Step 3: Speak a transition message before the first question
        setTimeout(() => {
            const transitionSentences = [
                "These are the skills we noticed you have. Now, answer the first question.",
                "We've analyzed your skills. Let's begin with the first question.",
                "Now that we know your skills, let's dive into the first question.",
                "Your skills are impressive! Let's see how you apply them to this first question.",
                "Great! Based on your skills, here's your first challenge.",
                "Now that we've covered your expertise, it's time for the first question.",
                "I see you're skilled in many areas. Let's begin with a relevant question.",
                "Now that we've reviewed your skills, let's jump into the first question.",
                "Let's put your skills to the test with this first question.",
                "You're off to a great start! Now, let's move to the first question."
            ];
    
            const randomSentence = transitionSentences[Math.floor(Math.random() * transitionSentences.length)];
            speakText(randomSentence);
        }, 9000); // ✅ Wait for skills message to finish
    
        // ✅ Step 4: Speak and display the first question
        setTimeout(() => {
            const firstQuestion = questions[0].question;
            addBotMessage(firstQuestion, 0, true);
    
            // ✅ Step 5: Enable mic 1 second after the question is spoken
            setTimeout(() => {
                startListening(); // ✅ Start listening instead of reinitializing speech recognition
            }, 1000);
    
        }, 12000); // ✅ Wait for transition message to finish
    
        // ✅ Start the interview timer after everything is set up
        setTimeout(() => {
            startTimer();
        }, 14000);
    }
    
    
    
    
    
    
    
    
    
    // Handle mic button
    micBtn.addEventListener('click', () => {
        if (speechRecognition) {
            if (isListening) {
                speechRecognition.stop();
                isListening = false;
                micBtn.innerHTML = '<i class="mic-icon">🎤</i>';
                micBtn.classList.remove('active');
            } else {
                speechRecognition.start();
                isListening = true;
                micBtn.innerHTML = '<i class="mic-icon">🎤 (listening)</i>';
                micBtn.classList.add('active');
            }
        }
    });
    
    // Handle user input submission
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const text = userInput.value.trim();
            
            if (text !== '') {
                submitUserAnswer(text);
                userInput.value = '';
            }
        }
    });
    
    // Coding quiz button
    codingQuizBtn.addEventListener('click', startCodingQuiz);
    
    // Run code button
    runCodeBtn.addEventListener('click', () => {
        // In a real app, you'd execute the code in a sandbox
        alert('Code execution would be implemented here in a real application.');
    });
    
    // Submit code button
    submitCodeBtn.addEventListener('click', ()=>{
        submitCodingSolution();
        codingQuizBtn.classList.add('hidden');
    });
    
    
    // Return to interview button
    returnInterviewBtn.addEventListener('click', () => {
        codingContainer.classList.add('hidden');
        interviewContainer.classList.remove('hidden');
        startTimer(); // Resume main timer
    });
    
    // Restart button
    restartBtn.addEventListener('click', () => {
        location.reload();
    });
});