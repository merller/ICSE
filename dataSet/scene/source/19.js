class EventBus {
    constructor() {
        this.listeners = {};
    }

    on(event, listener) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(listener);
    }

    emit(event, data) {
        if (this.listeners[event]) {
            this.listeners.forEach(listener => listener(data));
        }
    }
}

// 创建事件总线实例
const eventBus = new EventBus();

// 启动比赛计时器
function startTimer() {
    console.log("Starting the race timer.");
    event.startRaceTimer();
}

// 停止比赛计时器
function stopTimer() {
    console.log("Stopping the race timer.");
    event.stopRaceTimer();
}

// 更新成绩板
function updateScoreboard(score,team) {
    console.log(`Updating steam${team} scoreboard with score: ${score}`);
    event.updateScoreboard(score,team);
}

// 播放比赛背景音乐
function playRaceMusic() {
    console.log("Playing race background music.");
    event.playMusic("Race Playlist");
}

// 停止比赛背景音乐
function stopRaceMusic() {
    console.log("Stopping race background music.");
    event.stopMusic();
}

// 开始直播
function startLiveStream() {
    console.log("Starting the live stream.");
    event.startLiveStream();
}

// 停止直播
function stopLiveStream() {
    console.log("Stopping the live stream.");
    event.stopLiveStream();
}

// 事件处理
eventBus.on('startRace', () => {
    startTimer();
    playRaceMusic();
    startLiveStream();
});

eventBus.on('aScore', (score) => {
    updateScoreboard(score,a);
});
eventBus.on('bScore', (score) => {
    updateScoreboard(score,b);
});
eventBus.on('endRace', () => {
    stopTimer();
    stopRaceMusic();
    stopLiveStream();
});

// 初始化
function setupRaceScene() {
    eventBus.emit('startRace'); // 模拟比赛开始
    eventBus.emit('ascore'); // 模拟a队进球
    eventBus.emit('bscore'); // 模拟b队进球
    setTimeout(() => eventBus.emit('endRace'), 7200000); // 模拟2小时后比赛结束
}

// 启动足球比赛场景
setupRaceScene();
