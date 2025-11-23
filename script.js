// Game State
const gameState = {
    currentLevel: 1,
    score: 0,
    coins: 0,
    selectedCar: 0,
    selectedSpecialVehicle: -1,
    selectedMap: 0,
    isPremium: false,
    gameRunning: false,
    carPosition: { x: 400, y: 500 },
    carAngle: -Math.PI / 2,
    carSpeed: 0,
    keys: {},
    autoSync: false,
    lastBackup: null,
    currentUser: null,
    upgrades: {
        speed: { level: 0, maxLevel: 5, cost: 50, cost_per_level: 50 },
        acceleration: { level: 0, maxLevel: 5, cost: 50, cost_per_level: 50 },
        handling: { level: 0, maxLevel: 5, cost: 50, cost_per_level: 50 },
        armor: { level: 0, maxLevel: 3, cost: 100, cost_per_level: 100 },
        turbo: { level: 0, maxLevel: 3, cost: 150, cost_per_level: 150 },
        nitro: { level: 0, maxLevel: 5, cost: 75, cost_per_level: 75 }
    }
};

// ===== AUTHENTICATION SYSTEM =====
// (Authentication functions defined above)

// 30 Famous Cars & Vehicles Database
const cars = [
    // Sports Cars
    { id: 1, name: 'Ferrari F40', emoji: '🔴', speed: 9.5, acceleration: 9.2, handling: 8.5, color: '#FF0000', type: 'Sports Car' },
    { id: 2, name: 'Lamborghini Aventador', emoji: '🟡', speed: 9.3, acceleration: 9.0, handling: 8.3, color: '#FFD700', type: 'Sports Car' },
    { id: 3, name: 'Bugatti Veyron', emoji: '⚫', speed: 9.8, acceleration: 9.5, handling: 8.1, color: '#000000', type: 'Hypercar' },
    { id: 4, name: 'Porsche 911 Turbo', emoji: '🟠', speed: 9.1, acceleration: 8.8, handling: 9.0, color: '#FF8C00', type: 'Sports Car' },
    { id: 5, name: 'McLaren P1', emoji: '🟤', speed: 9.6, acceleration: 9.3, handling: 8.8, color: '#8B4513', type: 'Hypercar' },
    { id: 6, name: 'Mercedes AMG GT', emoji: '⚪', speed: 9.0, acceleration: 8.9, handling: 8.7, color: '#FFFFFF', type: 'Luxury Car' },
    { id: 7, name: 'Aston Martin DBS', emoji: '🔵', speed: 8.9, acceleration: 8.7, handling: 8.5, color: '#00008B', type: 'Luxury Car' },
    { id: 8, name: 'Jaguar F-Type', emoji: '🟣', speed: 8.7, acceleration: 8.5, handling: 8.4, color: '#800080', type: 'Sports Car' },
    { id: 9, name: 'Tesla Model S Plaid', emoji: '⚡', speed: 8.8, acceleration: 9.4, handling: 8.6, color: '#FF0000', type: 'Electric' },
    { id: 10, name: 'Nissan GT-R', emoji: '🟢', speed: 9.2, acceleration: 9.1, handling: 9.2, color: '#008000', type: 'Sports Car' },
    // Mid-Range Cars
    { id: 11, name: 'BMW M8', emoji: '🔶', speed: 8.8, acceleration: 8.6, handling: 8.5, color: '#FFB800', type: 'Luxury Car' },
    { id: 12, name: 'Dodge Viper', emoji: '🐍', speed: 9.4, acceleration: 9.0, handling: 8.2, color: '#FF0000', type: 'Muscle Car' },
    { id: 13, name: 'Corvette ZR2', emoji: '🏁', speed: 9.1, acceleration: 8.9, handling: 8.9, color: '#FFD700', type: 'Sports Car' },
    { id: 14, name: 'Hennessey Venom', emoji: '☠️', speed: 9.9, acceleration: 9.6, handling: 8.0, color: '#000000', type: 'Hypercar' },
    { id: 15, name: 'Koenigsegg Jesko', emoji: '👑', speed: 9.7, acceleration: 9.4, handling: 8.7, color: '#FFD700', type: 'Hypercar' },
    { id: 16, name: 'Pagani Huayra', emoji: '🎨', speed: 9.5, acceleration: 9.2, handling: 8.6, color: '#FF6347', type: 'Hypercar' },
    { id: 17, name: 'Lotus Evija', emoji: '⚡', speed: 9.8, acceleration: 9.5, handling: 9.1, color: '#90EE90', type: 'Electric' },
    { id: 18, name: 'Rimac C_Two', emoji: '🔌', speed: 9.6, acceleration: 9.7, handling: 8.9, color: '#00FFFF', type: 'Electric' },
    { id: 19, name: 'Pininfarina Battista', emoji: '✨', speed: 9.7, acceleration: 9.8, handling: 8.8, color: '#FFD700', type: 'Electric' },
    { id: 20, name: 'Devel Sixteen', emoji: '🏰', speed: 9.9, acceleration: 9.5, handling: 7.9, color: '#FF0000', type: 'Hypercar' },
    // Economy & Regular Cars
    { id: 21, name: 'Toyota Supra', emoji: '🟠', speed: 8.6, acceleration: 8.4, handling: 8.7, color: '#FF6347', type: 'Sports Car' },
    { id: 22, name: 'Honda NSX', emoji: '🟠', speed: 8.8, acceleration: 8.6, handling: 9.0, color: '#FF8C00', type: 'Sports Car' },
    { id: 23, name: 'Acura RDX', emoji: '🏎️', speed: 8.5, acceleration: 8.3, handling: 8.3, color: '#FFB6C1', type: 'Sedan' },
    { id: 24, name: 'Subaru BRZ', emoji: '🔵', speed: 8.4, acceleration: 8.2, handling: 8.8, color: '#0000FF', type: 'Sports Car' },
    { id: 25, name: 'Mazda RX-7', emoji: '🔴', speed: 8.3, acceleration: 8.1, handling: 8.6, color: '#DC143C', type: 'Sports Car' },
    { id: 26, name: 'Mitsubishi Lancer', emoji: '🟢', speed: 8.5, acceleration: 8.3, handling: 8.4, color: '#228B22', type: 'Sedan' },
    { id: 27, name: 'Hyundai N Vision', emoji: '⚡', speed: 8.9, acceleration: 8.7, handling: 8.5, color: '#FFD700', type: 'Electric' },
    { id: 28, name: 'Genesis G70', emoji: '👑', speed: 8.7, acceleration: 8.5, handling: 8.6, color: '#C0C0C0', type: 'Luxury Car' },
    { id: 29, name: 'Kia Stinger', emoji: '🐯', speed: 8.6, acceleration: 8.4, handling: 8.5, color: '#FF4500', type: 'Sedan' },
    { id: 30, name: 'Polestar 1', emoji: '⚡', speed: 8.8, acceleration: 8.6, handling: 8.7, color: '#000080', type: 'Electric' }
];

// Special Vehicles Database
const specialVehicles = [
    // Air Vehicles
    { id: 31, name: 'Helicopter Pro', emoji: '🚁', speed: 9.0, acceleration: 8.0, handling: 9.5, color: '#FF6347', type: 'Helicopter', category: 'Air' },
    { id: 32, name: 'Fighter Jet', emoji: '✈️', speed: 10.0, acceleration: 9.8, handling: 8.5, color: '#333333', type: 'Jet', category: 'Air' },
    { id: 33, name: 'Passenger Plane', emoji: '🛫', speed: 8.5, acceleration: 6.0, handling: 7.0, color: '#87CEEB', type: 'Airplane', category: 'Air' },
    { id: 34, name: 'Drone Racer', emoji: '🛸', speed: 9.5, acceleration: 9.5, handling: 10.0, color: '#00FF00', type: 'Drone', category: 'Air' },
    
    // Ground Vehicles
    { id: 35, name: 'City Bus', emoji: '🚌', speed: 6.0, acceleration: 4.0, handling: 5.5, color: '#FFD700', type: 'Bus', category: 'Ground' },
    { id: 36, name: 'Express Coach', emoji: '🚎', speed: 7.0, acceleration: 5.0, handling: 6.0, color: '#FF4500', type: 'Coach', category: 'Ground' },
    { id: 37, name: 'School Bus', emoji: '🚐', speed: 5.5, acceleration: 3.5, handling: 5.0, color: '#FFD700', type: 'Bus', category: 'Ground' },
    
    // Train Vehicles
    { id: 38, name: 'High Speed Train', emoji: '🚄', speed: 9.5, acceleration: 3.0, handling: 4.0, color: '#FF0000', type: 'Train', category: 'Rail' },
    { id: 39, name: 'Bullet Train', emoji: '🚅', speed: 9.8, acceleration: 2.5, handling: 3.5, color: '#000000', type: 'Train', category: 'Rail' },
    { id: 40, name: 'Classic Train', emoji: '🚂', speed: 7.0, acceleration: 2.0, handling: 3.0, color: '#8B4513', type: 'Train', category: 'Rail' },
    { id: 41, name: 'Freight Train', emoji: '🚆', speed: 6.5, acceleration: 1.5, handling: 2.5, color: '#696969', type: 'Train', category: 'Rail' },
    
    // Metro & Monorail
    { id: 42, name: 'Metro Express', emoji: '🚇', speed: 8.5, acceleration: 5.0, handling: 7.0, color: '#0066CC', type: 'Metro', category: 'Rail' },
    { id: 43, name: 'Underground Metro', emoji: '🚉', speed: 8.0, acceleration: 4.5, handling: 6.5, color: '#1a1a2e', type: 'Metro', category: 'Rail' },
    { id: 44, name: 'Monorail', emoji: '🚈', speed: 8.8, acceleration: 5.0, handling: 7.5, color: '#FFD700', type: 'Monorail', category: 'Rail' },
    
    // Luxury & Special
    { id: 45, name: 'Yacht Speedboat', emoji: '🚤', speed: 8.5, acceleration: 8.5, handling: 8.0, color: '#FFFFFF', type: 'Boat', category: 'Water' },
    { id: 46, name: 'Hovercraft', emoji: '🛥️', speed: 8.8, acceleration: 8.0, handling: 7.5, color: '#00FFFF', type: 'Hovercraft', category: 'Water' },
    { id: 47, name: 'Limousine Pro', emoji: '🚗', speed: 8.0, acceleration: 7.5, handling: 7.0, color: '#000000', type: 'Limo', category: 'Ground' },
    { id: 48, name: 'Tank Racer', emoji: '🚜', speed: 6.5, acceleration: 4.0, handling: 5.0, color: '#556B2F', type: 'Tank', category: 'Ground' },
    { id: 49, name: 'Ambulance', emoji: '🚑', speed: 8.0, acceleration: 8.0, handling: 8.5, color: '#FF0000', type: 'Emergency', category: 'Ground' },
    { id: 50, name: 'Police Car', emoji: '🚓', speed: 9.0, acceleration: 9.0, handling: 9.0, color: '#0000FF', type: 'Police', category: 'Ground' }
];

// 50 Maps/Tracks Database - Famous International Cities & Landmarks
const maps = [
    { id: 1, name: 'Kashi Varanasi', difficulty: 'Medium', desc: '🇮🇳 Sacred ghats of Varanasi' },
    { id: 2, name: 'Bhutan Thimphu', difficulty: 'Hard', desc: '🇧🇹 Mountain kingdom roads' },
    { id: 3, name: 'Hong Kong Streets', difficulty: 'Hard', desc: '🇭🇰 Neon-lit skyscraper racing' },
    { id: 4, name: 'Paris Champs', difficulty: 'Easy', desc: '🇫🇷 Iconic avenue drive' },
    { id: 5, name: 'Vietnam Hanoi', difficulty: 'Medium', desc: '🇻🇳 Chaotic city traffic' },
    { id: 6, name: 'Bangkok Night', difficulty: 'Medium', desc: '🇹🇭 Vibrant street racing' },
    { id: 7, name: 'New York Streets', difficulty: 'Hard', desc: '🇺🇸 Manhattan urban jungle' },
    { id: 8, name: 'Amsterdam Canals', difficulty: 'Easy', desc: '🇳🇱 Romantic bridge routes' },
    { id: 9, name: 'Barcelona City', difficulty: 'Medium', desc: '🇪🇸 Gaudí architecture roads' },
    { id: 10, name: 'Rome Ancient', difficulty: 'Medium', desc: '🇮🇹 Historic city loops' },
    { id: 11, name: 'Berlin Highway', difficulty: 'Medium', desc: '🇩🇪 Modern city circuits' },
    { id: 12, name: 'Moscow Red Square', difficulty: 'Hard', desc: '🇷🇺 Grand imperial roads' },
    { id: 13, name: 'Istanbul Bosphorus', difficulty: 'Hard', desc: '🇹🇷 Bridge crossing adventure' },
    { id: 14, name: 'Cairo Desert', difficulty: 'Hard', desc: '🇪🇬 Pyramid highway tracks' },
    { id: 15, name: 'Sydney Opera', difficulty: 'Easy', desc: '🇦🇺 Harbor scenic drive' },
    { id: 16, name: 'Melbourne Streets', difficulty: 'Medium', desc: '🇦🇺 Street art city routes' },
    { id: 17, name: 'Singapore Marina', difficulty: 'Hard', desc: '🇸🇬 Futuristic city tracks' },
    { id: 18, name: 'Dubai Gold', difficulty: 'Hard', desc: '🇦🇪 Luxury mega city roads' },
    { id: 19, name: 'Bangkok Neon', difficulty: 'Hard', desc: '🇹🇭 Tuk-tuk racing chaos' },
    { id: 20, name: 'Seoul Night', difficulty: 'Hard', desc: '🇰🇷 K-pop city lights' },
    { id: 21, name: 'Tokyo Shibuya', difficulty: 'Hard', desc: '🇯🇵 Busiest crossing track' },
    { id: 22, name: 'Kyoto Temple', difficulty: 'Medium', desc: '🇯🇵 Ancient shrine roads' },
    { id: 23, name: 'Bangkok Floating', difficulty: 'Medium', desc: '🇹🇭 Water market racing' },
    { id: 24, name: 'Jaipur Palace', difficulty: 'Medium', desc: '🇮🇳 Pink city routes' },
    { id: 25, name: 'Delhi Taj Mahal', difficulty: 'Hard', desc: '🇮🇳 Monument highway' },
    { id: 26, name: 'Mumbai Coastal', difficulty: 'Medium', desc: '🇮🇳 Bollywood city racing' },
    { id: 27, name: 'Goa Beach Road', difficulty: 'Easy', desc: '🇮🇳 Tropical paradise drive' },
    { id: 28, name: 'Phuket Island', difficulty: 'Medium', desc: '🇹🇭 Island coastal racing' },
    { id: 29, name: 'Bali Batu', difficulty: 'Medium', desc: '🇮🇩 Tropical temple roads' },
    { id: 30, name: 'Jakarta Highway', difficulty: 'Hard', desc: '🇮🇩 Mega city traffic' },
    { id: 31, name: 'Phnom Penh', difficulty: 'Medium', desc: '🇰🇭 Riverside city drive' },
    { id: 32, name: 'Kuala Lumpur', difficulty: 'Hard', desc: '🇲🇾 Twin tower racing' },
    { id: 33, name: 'Manila Metro', difficulty: 'Hard', desc: '🇵🇭 Chaotic city streets' },
    { id: 34, name: 'Chiang Mai Old', difficulty: 'Medium', desc: '🇹🇭 Ancient city walls' },
    { id: 35, name: 'Laos Vientiane', difficulty: 'Easy', desc: '🇱🇦 Peaceful river roads' },
    { id: 36, name: 'Nepal Kathmandu', difficulty: 'Hard', desc: '🇳🇵 Mountain city chaos' },
    { id: 37, name: 'Pakistan Lahore', difficulty: 'Hard', desc: '🇵🇰 Mughal city routes' },
    { id: 38, name: 'Sri Lanka Colombo', difficulty: 'Medium', desc: '🇱🇰 Island capital racing' },
    { id: 39, name: 'Bangladesh Dhaka', difficulty: 'Hard', desc: '🇧🇩 Crowded city streets' },
    { id: 40, name: 'Vietnam Saigon', difficulty: 'Hard', desc: '🇻🇳 Motorbike city chaos' },
    { id: 41, name: 'Cambodia Siem', difficulty: 'Medium', desc: '🇰🇭 Ancient temple roads' },
    { id: 42, name: 'Malaysia Penang', difficulty: 'Easy', desc: '🇲🇾 Historic island drive' },
    { id: 43, name: 'Borneo Jungle', difficulty: 'Hard', desc: '🇲🇾 Rainforest racing' },
    { id: 44, name: 'Indonesia Surabaya', difficulty: 'Hard', desc: '🇮🇩 East java circuits' },
    { id: 45, name: 'Thailand Pattaya', difficulty: 'Medium', desc: '🇹🇭 Beach resort racing' },
    { id: 46, name: 'Myanmar Yangon', difficulty: 'Medium', desc: '🇲🇲 Golden pagoda roads' },
    { id: 47, name: 'Vietnam Mekong', difficulty: 'Medium', desc: '🇻🇳 River delta tracks' },
    { id: 48, name: 'India Bangalore', difficulty: 'Hard', desc: '🇮🇳 Tech city circuits' },
    { id: 49, name: 'Kashmir Valley', difficulty: 'Hard', desc: '🇮🇳 Paradise mountain pass' },
    { id: 50, name: 'Himalayan Peak', difficulty: 'Hard', desc: '🏔️ Ultimate mountain challenge' }
];

// Level Descriptions
const levelDescriptions = {
    1: 'Complete the race and reach the finish line!',
    2: 'Avoid obstacles and improve your speed!',
    3: 'Master the turns - precision is key!',
    4: 'Drift around corners for bonus points!',
    5: 'Night driving - stay on the road!',
    10: 'Expert mode - all skills required!',
    15: 'Legend difficulty - extreme challenges!',
    20: 'Master racer - ultimate test!'
};

// ===== AUTHENTICATION SYSTEM =====

// Get all users from localStorage
function getAllUsers() {
    const users = localStorage.getItem('drivemax_users');
    return users ? JSON.parse(users) : [];
}

// Save users to localStorage
function saveAllUsers(users) {
    localStorage.setItem('drivemax_users', JSON.stringify(users));
}

// Register new user
function handleSignUp(event) {
    event.preventDefault();
    
    const username = document.getElementById('signupUsername').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirm = document.getElementById('signupConfirm').value;
    
    if (password !== confirm) {
        alert('Passwords do not match!');
        return;
    }
    
    if (password.length < 6) {
        alert('Password must be at least 6 characters long!');
        return;
    }
    
    const users = getAllUsers();
    
    if (users.find(u => u.username === username)) {
        alert('Username already exists!');
        return;
    }
    
    if (users.find(u => u.email === email)) {
        alert('Email already registered!');
        return;
    }
    
    // Create new user account
    const newUser = {
        id: 'USER_' + Date.now(),
        username: username,
        email: email,
        password: btoa(password), // Simple base64 encoding (not secure for production)
        isPremium: false,
        createdAt: new Date().toLocaleString(),
        gameData: null
    };
    
    users.push(newUser);
    saveAllUsers(users);
    
    alert(`✓ Account created successfully!\n\nUsername: ${username}\n\nYou can now sign in with your credentials.`);
    
    // Clear form
    document.getElementById('signupUsername').value = '';
    document.getElementById('signupEmail').value = '';
    document.getElementById('signupPassword').value = '';
    document.getElementById('signupConfirm').value = '';
    document.getElementById('termsAccept').checked = false;
    
    // Switch to sign in tab
    switchTab('signin');
}

// Sign in user
function handleSignIn(event) {
    event.preventDefault();
    
    const userId = document.getElementById('signinId').value.trim();
    const password = document.getElementById('signinPassword').value;
    const rememberMe = document.getElementById('rememberSignin').checked;
    
    // Special case: User ID 100 grants instant premium access
    if (userId === '100' && password === 'password123') {
        gameState.currentUser = {
            id: '100',
            username: 'Premium User',
            email: 'premium@drivemax.com',
            isPremium: true,
            createdAt: new Date().toLocaleString()
        };
        gameState.isPremium = true;
        
        if (rememberMe) {
            localStorage.setItem('drivemax_remembered_user', JSON.stringify(gameState.currentUser));
        }
        
        saveLocalStorage();
        loginSuccess();
        return;
    }
    
    // Check registered users
    const users = getAllUsers();
    const user = users.find(u => u.username === userId || u.email === userId);
    
    if (!user) {
        alert('User not found! Please check your ID/Email or sign up.');
        return;
    }
    
    if (btoa(password) !== user.password) {
        alert('Invalid password!');
        return;
    }
    
    // Successful login
    gameState.currentUser = {
        id: user.id,
        username: user.username,
        email: user.email,
        isPremium: user.isPremium,
        createdAt: user.createdAt
    };
    gameState.isPremium = user.isPremium;
    
    if (user.gameData) {
        Object.assign(gameState, JSON.parse(user.gameData));
    }
    
    if (rememberMe) {
        localStorage.setItem('drivemax_remembered_user', JSON.stringify(gameState.currentUser));
    }
    
    saveLocalStorage();
    loginSuccess();
}

// Handle successful login
function loginSuccess() {
    alert(`✓ Welcome ${gameState.currentUser.username}!\n\n${gameState.isPremium ? '⭐ Premium Access Granted!' : 'Standard User'}`);
    
    // Update welcome message
    document.getElementById('welcomeUser').textContent = `Welcome, ${gameState.currentUser.username}!`;
    
    // Show premium badge if applicable
    if (gameState.isPremium) {
        document.getElementById('premiumBadge').style.display = 'inline-block';
    }
    
    // Switch to home screen
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('homeScreen').classList.add('active');
    
    // Initialize game
    loadLocalStorage();
    renderCars();
    renderSpecialVehicles();
    renderMaps();
    renderUpgrades();
    updateCloudStatus();
    setupEventListeners();
}

// Logout function
function logout() {
    const confirm = window.confirm('Are you sure you want to logout?\n\nYour progress will be saved.');
    
    if (!confirm) return;
    
    // Save current game data before logout
    const users = getAllUsers();
    const userIndex = users.findIndex(u => u.id === gameState.currentUser.id);
    
    if (userIndex !== -1) {
        users[userIndex].gameData = JSON.stringify(gameState);
        users[userIndex].isPremium = gameState.isPremium;
        saveAllUsers(users);
    }
    
    // Clear session
    gameState.currentUser = null;
    localStorage.removeItem('drivemax_remembered_user');
    
    // Reset game state
    gameState.isPremium = false;
    gameState.currentLevel = 1;
    gameState.score = 0;
    gameState.coins = 0;
    
    // Return to login
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('loginScreen').classList.add('active');
    
    alert('You have been logged out successfully.');
}

// Switch between sign in and sign up tabs
function switchTab(tab) {
    // Hide all tabs
    document.getElementById('signinTab').classList.remove('active');
    document.getElementById('signupTab').classList.remove('active');
    
    // Remove active class from buttons
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    
    // Show selected tab
    if (tab === 'signin') {
        document.getElementById('signinTab').classList.add('active');
        document.querySelectorAll('.tab-btn')[0].classList.add('active');
    } else {
        document.getElementById('signupTab').classList.add('active');
        document.querySelectorAll('.tab-btn')[1].classList.add('active');
    }
}

// Check for remembered user on page load
function checkRememberedUser() {
    const remembered = localStorage.getItem('drivemax_remembered_user');
    
    if (remembered) {
        try {
            const user = JSON.parse(remembered);
            gameState.currentUser = user;
            gameState.isPremium = user.isPremium;
            
            document.getElementById('welcomeUser').textContent = `Welcome, ${user.username}!`;
            if (user.isPremium) {
                document.getElementById('premiumBadge').style.display = 'inline-block';
            }
            
            document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
            document.getElementById('homeScreen').classList.add('active');
            
            loadLocalStorage();
            renderCars();
            renderSpecialVehicles();
            renderMaps();
            renderUpgrades();
            updateCloudStatus();
            setupEventListeners();
        } catch (error) {
            console.log('Remembered user data corrupted');
        }
    }
}

// Initialize Game
function initGame() {
    loadLocalStorage();
    renderCars();
    renderSpecialVehicles();
    renderMaps();
    renderUpgrades();
    updateCloudStatus();
    setupEventListeners();
    
    // Auto-sync every 5 minutes if enabled
    if (gameState.autoSync) {
        setInterval(() => {
            if (gameState.autoSync) {
                uploadToCloud(true);
            }
        }, 300000);
    }
}

// Local Storage Functions
function loadLocalStorage() {
    const saved = localStorage.getItem('gameState');
    if (saved) {
        Object.assign(gameState, JSON.parse(saved));
    }
}

function saveLocalStorage() {
    localStorage.setItem('gameState', JSON.stringify(gameState));
}

// Screen Navigation
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    
    if (screenId === 'gameScreen') {
        startGame();
    } else if (screenId === 'homeScreen') {
        updateHomeScreen();
    }
}

function updateHomeScreen() {
    document.getElementById('userLevel').textContent = gameState.currentLevel;
    document.getElementById('userScore').textContent = gameState.score;
    document.getElementById('userCoins').textContent = gameState.coins;
}

// Render Cars List
function renderCars() {
    const carsList = document.getElementById('carsList');
    carsList.innerHTML = '';
    
    cars.forEach((car, idx) => {
        const locked = !gameState.isPremium && idx >= 5;
        const carEl = document.createElement('div');
        carEl.className = `item-card ${locked ? 'locked' : 'unlocked'}`;
        carEl.innerHTML = `
            <div class="item-header">
                <div class="item-emoji">${car.emoji}</div>
                ${locked ? '<div class="lock-badge">🔒</div>' : ''}
            </div>
            <h3>${car.name}</h3>
            <div class="car-stats">
                <span>Speed: ${car.speed}/10</span>
                <span>Accel: ${car.acceleration}/10</span>
            </div>
            <button class="btn btn-select" onclick="selectCar(${idx})" ${locked ? 'disabled' : ''}>
                ${locked ? 'LOCKED' : gameState.selectedCar === idx ? 'SELECTED' : 'SELECT'}
            </button>
        `;
        carsList.appendChild(carEl);
    });
}

// Render Maps List
function renderMaps() {
    const mapsList = document.getElementById('mapsList');
    mapsList.innerHTML = '';
    
    maps.forEach((map, idx) => {
        const locked = !gameState.isPremium && idx >= 10;
        const mapEl = document.createElement('div');
        mapEl.className = `item-card ${locked ? 'locked' : 'unlocked'}`;
        mapEl.innerHTML = `
            <div class="item-header">
                <div class="item-emoji">🗺️</div>
                ${locked ? '<div class="lock-badge">🔒</div>' : ''}
            </div>
            <h3>${map.name}</h3>
            <div class="map-info">
                <span>Difficulty: ${map.difficulty}</span>
                <span>${map.desc}</span>
            </div>
            <button class="btn btn-select" onclick="selectMap(${idx})" ${locked ? 'disabled' : ''}>
                ${locked ? 'LOCKED' : gameState.selectedMap === idx ? 'SELECTED' : 'SELECT'}
            </button>
        `;
        mapsList.appendChild(mapEl);
    });
}

function selectCar(idx) {
    if (!gameState.isPremium && idx >= 5) return;
    gameState.selectedCar = idx;
    gameState.selectedSpecialVehicle = -1;
    saveLocalStorage();
    renderCars();
    renderSpecialVehicles();
}

function selectSpecialVehicle(idx) {
    if (!gameState.isPremium && idx >= 5) return;
    gameState.selectedSpecialVehicle = idx;
    gameState.selectedCar = -1;
    saveLocalStorage();
    renderCars();
    renderSpecialVehicles();
}

// Render Special Vehicles List
function renderSpecialVehicles() {
    const vehiclesList = document.getElementById('vehiclesList');
    if (!vehiclesList) return;
    
    vehiclesList.innerHTML = '';
    
    specialVehicles.forEach((vehicle, idx) => {
        const locked = !gameState.isPremium && idx >= 5;
        const vehicleEl = document.createElement('div');
        vehicleEl.className = `item-card ${locked ? 'locked' : 'unlocked'}`;
        vehicleEl.innerHTML = `
            <div class="item-header">
                <div class="item-emoji">${vehicle.emoji}</div>
                ${locked ? '<div class="lock-badge">🔒</div>' : ''}
            </div>
            <h3>${vehicle.name}</h3>
            <div class="vehicle-category">${vehicle.type}</div>
            <div class="car-stats">
                <span>Speed: ${vehicle.speed}/10</span>
                <span>Accel: ${vehicle.acceleration}/10</span>
                <span>Handle: ${vehicle.handling}/10</span>
            </div>
            <button class="btn btn-select" onclick="selectSpecialVehicle(${idx})" ${locked ? 'disabled' : ''}>
                ${locked ? 'LOCKED' : gameState.selectedSpecialVehicle === idx ? 'SELECTED' : 'SELECT'}
            </button>
        `;
        vehiclesList.appendChild(vehicleEl);
    });
}

// Render Upgrades System
function renderUpgrades() {
    const upgradesList = document.getElementById('upgradesList');
    if (!upgradesList) return;
    
    upgradesList.innerHTML = '';
    
    const upgrades = [
        { key: 'speed', name: '⚡ Speed', icon: '🏃' },
        { key: 'acceleration', name: '🚀 Acceleration', icon: '💨' },
        { key: 'handling', name: '🎯 Handling', icon: '🎪' },
        { key: 'armor', name: '🛡️ Armor', icon: '⚔️' },
        { key: 'turbo', name: '🔥 Turbo', icon: '💥' },
        { key: 'nitro', name: '⚡ Nitro Boost', icon: '✨' }
    ];
    
    upgrades.forEach(upgrade => {
        const data = gameState.upgrades[upgrade.key];
        const isMaxed = data.level >= data.maxLevel;
        const nextCost = (data.level + 1) * data.cost_per_level;
        
        const upgradeEl = document.createElement('div');
        upgradeEl.className = 'upgrade-card';
        upgradeEl.innerHTML = `
            <div class="upgrade-header">
                <div class="upgrade-icon">${upgrade.icon}</div>
                <h3>${upgrade.name}</h3>
            </div>
            <div class="upgrade-level">
                <span>Level: ${data.level}/${data.maxLevel}</span>
                <div class="level-bar">
                    <div class="level-fill" style="width: ${(data.level / data.maxLevel) * 100}%"></div>
                </div>
            </div>
            <div class="upgrade-benefits">
                <span>+${data.level * 2}% boost</span>
            </div>
            <button class="btn btn-upgrade" onclick="upgradeVehicle('${upgrade.key}')" ${isMaxed ? 'disabled' : ''}>
                ${isMaxed ? 'MAXED' : `UPGRADE - ${nextCost} 💰`}
            </button>
        `;
        upgradesList.appendChild(upgradeEl);
    });
}

function upgradeVehicle(upgradeType) {
    const upgrade = gameState.upgrades[upgradeType];
    
    if (upgrade.level >= upgrade.maxLevel) {
        alert('This upgrade is already maxed out!');
        return;
    }
    
    const nextCost = (upgrade.level + 1) * upgrade.cost_per_level;
    
    if (gameState.coins < nextCost) {
        alert(`Not enough coins! Need ${nextCost} coins, you have ${gameState.coins}`);
        return;
    }
    
    gameState.coins -= nextCost;
    upgrade.level++;
    saveLocalStorage();
    renderUpgrades();
    updateHomeScreen();
}

function selectMap(idx) {
    if (!gameState.isPremium && idx >= 10) return;
    gameState.selectedMap = idx;
    saveLocalStorage();
    renderMaps();
}

// Payment Functions
function initiatePayment() {
    document.getElementById('paymentModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('paymentModal').style.display = 'none';
    document.getElementById('userIdInput').value = '';
}

function closeSuccessModal() {
    document.getElementById('successModal').style.display = 'none';
    gameState.isPremium = true;
    saveLocalStorage();
    renderCars();
    renderMaps();
    showScreen('homeScreen');
}

function verifyAndPay() {
    const userId = document.getElementById('userIdInput').value.trim();
    
    if (!userId) {
        alert('Please enter User ID');
        return;
    }
    
    if (userId !== '100') {
        alert('Invalid User ID. Please enter: 100');
        return;
    }
    
    // Simulate payment processing
    closeModal();
    
    // Show payment gateway redirect
    const upiLink = `upi://pay?pa=9454881411@upi&pn=DriveMax&tn=Premium%20Access&am=100&cu=INR`;
    const confirmPayment = confirm(
        'Redirecting to UPI Payment Gateway\n\n' +
        'UPI ID: 9454881411\n' +
        'Amount: ₹100\n\n' +
        'Click OK to proceed with payment'
    );
    
    if (confirmPayment) {
        // Simulate successful payment
        setTimeout(() => {
            document.getElementById('successModal').style.display = 'flex';
            document.getElementById('successMessage').textContent = 
                'Premium access unlocked! All cars and maps are now available!';
        }, 500);
    }
}

// Support Functions
function submitFeedback() {
    const feedback = document.querySelector('.feedback-textarea').value;
    if (feedback.trim()) {
        alert('Thank you for your feedback!\nWe appreciate your input and will review it shortly.');
        document.querySelector('.feedback-textarea').value = '';
    }
}

// Game Canvas Functions
function startGame() {
    gameState.gameRunning = true;
    gameState.carPosition = { x: 400, y: 500 };
    gameState.carAngle = -Math.PI / 2;
    gameState.carSpeed = 0;
    
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    let startTime = Date.now();
    let gameTime = 0;
    
    const gameLoop = () => {
        if (!gameState.gameRunning) return;
        
        gameTime = Math.floor((Date.now() - startTime) / 1000);
        const minutes = Math.floor(gameTime / 60);
        const seconds = gameTime % 60;
        document.getElementById('timer').textContent = 
            `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        
        // Clear canvas
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw road
        drawRoad(ctx, canvas);
        
        // Handle input
        handleInput();
        
        // Update car position
        updateCarPhysics();
        
        // Draw car
        drawCar(ctx);
        
        // Draw obstacles
        drawObstacles(ctx);
        
        // Update UI
        document.getElementById('speed').textContent = Math.floor(gameState.carSpeed);
        
        requestAnimationFrame(gameLoop);
    };
    
    gameLoop();
}

function drawRoad(ctx, canvas) {
    // Draw road lanes
    ctx.fillStyle = '#333333';
    ctx.fillRect(150, 0, 500, canvas.height);
    
    // Draw lane markings
    ctx.strokeStyle = '#FFD700';
    ctx.setLineDash([20, 20]);
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(400, 0);
    ctx.lineTo(400, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw road edges
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 5;
    ctx.strokeRect(150, 0, 500, canvas.height);
}

function drawCar(ctx) {
    ctx.save();
    ctx.translate(gameState.carPosition.x, gameState.carPosition.y);
    ctx.rotate(gameState.carAngle);
    
    const car = cars[gameState.selectedCar];
    
    // Car body
    ctx.fillStyle = car.color;
    ctx.fillRect(-20, -10, 40, 30);
    
    // Windows
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(-15, -5, 12, 8);
    ctx.fillRect(3, -5, 12, 8);
    
    // Wheels
    ctx.fillStyle = '#000000';
    ctx.fillRect(-18, -12, 8, 8);
    ctx.fillRect(10, -12, 8, 8);
    ctx.fillRect(-18, 12, 8, 8);
    ctx.fillRect(10, 12, 8, 8);
    
    ctx.restore();
}

function drawObstacles(ctx) {
    // Draw some simple obstacles
    ctx.fillStyle = '#FF6347';
    ctx.fillRect(200, 150, 30, 30);
    ctx.fillRect(550, 300, 30, 30);
    ctx.fillRect(300, 450, 30, 30);
}

function handleInput() {
    if (gameState.keys['ArrowUp']) gameState.carSpeed = Math.min(gameState.carSpeed + 1, 15);
    if (gameState.keys['ArrowDown']) gameState.carSpeed = Math.max(gameState.carSpeed - 2, -5);
    if (gameState.keys['ArrowLeft']) gameState.carAngle -= 0.15;
    if (gameState.keys['ArrowRight']) gameState.carAngle += 0.15;
    
    gameState.carSpeed *= 0.98; // Friction
}

function updateCarPhysics() {
    const canvas = document.getElementById('gameCanvas');
    
    gameState.carPosition.x += Math.cos(gameState.carAngle) * gameState.carSpeed;
    gameState.carPosition.y += Math.sin(gameState.carAngle) * gameState.carSpeed;
    
    // Boundary collision
    if (gameState.carPosition.x < 160) gameState.carPosition.x = 160;
    if (gameState.carPosition.x > 640) gameState.carPosition.x = 640;
    if (gameState.carPosition.y < 10) gameState.carPosition.y = 10;
    if (gameState.carPosition.y > canvas.height - 10) {
        // Finish line
        completeLevel();
    }
}

function completeLevel() {
    gameState.gameRunning = false;
    gameState.currentLevel++;
    gameState.score += 100;
    gameState.coins += 50;
    saveLocalStorage();
    
    alert(`Level ${gameState.currentLevel - 1} Complete!\n\nScore: 100\nCoins: 50\n\nPress OK to continue`);
    showScreen('homeScreen');
}

function setupEventListeners() {
    document.addEventListener('keydown', (e) => {
        gameState.keys[e.key] = true;
    });
    
    document.addEventListener('keyup', (e) => {
        gameState.keys[e.key] = false;
    });
}

// ===== CLOUD BACKUP SYSTEM =====

// Get all backups from localStorage
function getCloudBackups() {
    const backups = localStorage.getItem('drivemax_backups');
    return backups ? JSON.parse(backups) : [];
}

// Save backups to localStorage
function saveCloudBackups(backups) {
    localStorage.setItem('drivemax_backups', JSON.stringify(backups));
}

// Upload game data to cloud
function uploadToCloud(isSilent = false) {
    const backups = getCloudBackups();
    const newBackup = {
        id: Date.now(),
        timestamp: new Date().toLocaleString(),
        data: JSON.stringify(gameState)
    };
    
    backups.push(newBackup);
    
    // Keep only last 10 backups
    if (backups.length > 10) {
        backups.shift();
    }
    
    saveCloudBackups(backups);
    gameState.lastBackup = new Date().toLocaleString();
    saveLocalStorage();
    updateCloudStatus();
    
    if (!isSilent) {
        alert('✓ Backup uploaded successfully!\n\nYour game data has been saved to the cloud.');
    }
}

// Download game data from cloud
function downloadFromCloud() {
    const backups = getCloudBackups();
    
    if (backups.length === 0) {
        alert('No backups found in cloud. Create a backup first!');
        return;
    }
    
    const latestBackup = backups[backups.length - 1];
    const confirmRestore = confirm(
        `Restore backup from ${latestBackup.timestamp}?\n\n` +
        'This will overwrite your current progress.'
    );
    
    if (confirmRestore) {
        try {
            const restoredData = JSON.parse(latestBackup.data);
            Object.assign(gameState, restoredData);
            saveLocalStorage();
            updateCloudStatus();
            renderCars();
            renderSpecialVehicles();
            renderMaps();
            renderUpgrades();
            updateHomeScreen();
            alert('✓ Data restored successfully!\n\nYour progress has been restored from cloud.');
        } catch (error) {
            alert('Error restoring backup. Please try again.');
            console.error('Restore error:', error);
        }
    }
}

// Toggle auto-sync
function toggleAutoSync() {
    gameState.autoSync = !gameState.autoSync;
    saveLocalStorage();
    
    const btn = document.getElementById('autoSyncBtn');
    btn.textContent = gameState.autoSync ? 'DISABLE' : 'ENABLE';
    btn.style.background = gameState.autoSync ? '#E74C3C' : 'linear-gradient(135deg, var(--primary-color), #FF8C42)';
    
    if (gameState.autoSync) {
        alert('✓ Auto-sync enabled!\n\nYour progress will be backed up every 5 minutes.');
        // Start auto-sync
        setInterval(() => {
            if (gameState.autoSync) {
                uploadToCloud(true);
            }
        }, 300000);
    } else {
        alert('Auto-sync disabled.');
    }
}

// Update cloud status display
function updateCloudStatus() {
    const backups = getCloudBackups();
    
    // Update status
    const lastBackupTime = gameState.lastBackup || 'Never';
    document.getElementById('backupStatus').textContent = `Last Backup: ${lastBackupTime}`;
    
    // Calculate data size
    const dataSize = new Blob([JSON.stringify(gameState)]).size;
    const sizeMB = (dataSize / 1024).toFixed(2);
    document.getElementById('backupSize').textContent = `Data Size: ${sizeMB} KB (${backups.length} backups)`;
    
    // Update details
    document.getElementById('cloudLevel').textContent = gameState.currentLevel;
    document.getElementById('cloudScore').textContent = gameState.score.toLocaleString();
    document.getElementById('cloudCoins').textContent = gameState.coins.toLocaleString();
    document.getElementById('cloudPremium').textContent = gameState.isPremium ? 'Unlocked' : 'Locked';
    
    // Calculate total upgrades
    let totalUpgrades = 0;
    for (let key in gameState.upgrades) {
        totalUpgrades += gameState.upgrades[key].level;
    }
    document.getElementById('cloudUpgrades').textContent = totalUpgrades;
    document.getElementById('cloudLastUpdate').textContent = gameState.lastBackup || 'Never';
    
    // Update auto-sync button
    const btn = document.getElementById('autoSyncBtn');
    if (btn) {
        btn.textContent = gameState.autoSync ? 'DISABLE' : 'ENABLE';
        btn.style.background = gameState.autoSync ? '#E74C3C' : 'linear-gradient(135deg, var(--primary-color), #FF8C42)';
    }
}

// Initialize on page load
window.addEventListener('load', () => {
    checkRememberedUser();
});
