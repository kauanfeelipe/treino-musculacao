const weekdayKeys = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];

const workoutData = {
    "segunda": {
        title: "Treino A",
        focus: "Peito, Ombro, Tríceps",
        cardio: "30min Escada (Pós-treino)",
        exercises: [
            { name: "Supino Inclinado", muscle: "peito", sets: "4", reps: "8-12" },
            { name: "Crucifixo", muscle: "peito", sets: "4", reps: "12-15" },
            { name: "Supino Reto", muscle: "peito", sets: "3", reps: "8-12" },
            { name: "Desenvolvimento Halteres", muscle: "ombro", sets: "4", reps: "8-12" },
            { name: "Elevação Lateral", muscle: "ombro", sets: "4", reps: "12-15" },
            { name: "Tríceps Corda", muscle: "triceps", sets: "4", reps: "12-15" },
            { name: "Tríceps Francês(atrás pescoço)", muscle: "triceps", sets: "4", reps: "10-12" }
        ]
    },
    "terca": {
        title: "Treino B",
        focus: "Costas, Bíceps, Post. Ombro",
        cardio: "30min  (Pós-treino)",
        exercises: [
            { name: "Puxada Alta Aberta", muscle: "costas", sets: "4", reps: "8-12" },
            { name: "Remada Baixa(umbigo)", muscle: "costas", sets: "4", reps: "8-12" },
            { name: "Remada peito apoiado", muscle: "costas", sets: "4", reps: "8-12" },
            { name: "Remada Unilateral", muscle: "costas", sets: "4", reps: "8-12" },
            { name: "Crucifixo Inverso", muscle: "ombro", sets: "4", reps: "12-15" },
            { name: "Rosca Direta", muscle: "biceps", sets: "4", reps: "10-12" },
            { name: "Rosca Martelo", muscle: "biceps", sets: "4", reps: "12" },
            { name: "Abdominal Infra", muscle: "abs", sets: "4", reps: "15-20" }
        ]
    },
    "quarta": {
        title: "Treino C1: Pernas (Quadríceps)",
        focus: "Volume de Coxa",
        cardio: "OFF ",
        exercises: [
            { name: "Agachamento Livre", muscle: "perna", sets: "4", reps: "8-10" },
            { name: "Leg Press", muscle: "perna", sets: "4", reps: "10-12" },
            { name: "Cadeira Extensora", muscle: "perna", sets: "4", reps: "15" },
            { name: "Afundo / Passada", muscle: "perna", sets: "3", reps: "12 pass" },
            { name: "Panturrilha em Pé", muscle: "perna", sets: "5", reps: "15" }
        ]
    },
    "quinta": {
        title: "Treino A",
        focus: "Peito, Ombro, Tríceps",
        cardio: "30min Bike (Pós-treino)",
        exercises: [
            { name: "Supino Inclinado", muscle: "peito", sets: "4", reps: "8-12" },
            { name: "Crucifixo ", muscle: "peito", sets: "4", reps: "12-15" },
            { name: "Supino Reto", muscle: "peito", sets: "3", reps: "8-12" },
            { name: "Desenv. Halteres", muscle: "ombro", sets: "4", reps: "8-12" },
            { name: "Elevação Lateral", muscle: "ombro", sets: "4", reps: "12-15" },
            { name: "Tríceps Corda", muscle: "triceps", sets: "4", reps: "12-15" },
            { name: "Tríceps Testa", muscle: "triceps", sets: "3", reps: "10-12" }
        ]
    },
    "sexta": {
        title: "Treino B",
        focus: "Costas, Bíceps",
        cardio: "30min Caminhada (Pós-treino)",
        exercises: [
            { name: "Puxada Alta", muscle: "costas", sets: "4", reps: "8-12" },
            { name: "Cavalinho", muscle: "costas", sets: "4", reps: "8-12" },
            { name: "Remada peito apoiado", muscle: "costas", sets: "4", reps: "8-12" },
            { name: "Remada Unilateral", muscle: "costas", sets: "4", reps: "8-12" },
            { name: "Crucifixo Inverso", muscle: "ombro", sets: "4", reps: "12-15" },
            { name: "Rosca Direta", muscle: "biceps", sets: "4", reps: "10-12" },
            { name: "Rosca Martelo", muscle: "biceps", sets: "4", reps: "12" },
            { name: "Abdominal Supra", muscle: "abs", sets: "4", reps: "20" }
        ]
    },
    "sabado": {
        title: "Treino C2: Pernas (Posterior)",
        focus: "Posterior",
        cardio: "OFF",
        exercises: [
            { name: "Stiff / Terra Romeno", muscle: "perna", sets: "4", reps: "10-12" },
            { name: "Mesa Flexora", muscle: "perna", sets: "4", reps: "12-15" },
            { name: "Cadeira Flexora", muscle: "perna", sets: "4", reps: "12-15" },
            { name: "Afundo / Passada", muscle: "perna", sets: "3", reps: "12 pass" },
            { name: "Panturrilha Sentado", muscle: "perna", sets: "5", reps: "15" }
        ]
    }
};

const daysMap = [
    { key: 'segunda', label: 'SEG' },
    { key: 'terca', label: 'TER' },
    { key: 'quarta', label: 'QUA' },
    { key: 'quinta', label: 'QUI' },
    { key: 'sexta', label: 'SEX' },
    { key: 'sabado', label: 'SÁB' },
];
let currentDayKey = '';
const navContainer = document.getElementById('day-nav');
const contentContainer = document.getElementById('workout-container');

function getStorageKey(dayKey) {
    return `treino-progress:${dayKey}`;
}

function getCompletedExercises(dayKey) {
    const key = getStorageKey(dayKey);
    const stored = localStorage.getItem(key);
    if (!stored) return [];
    try {
        return JSON.parse(stored);
    } catch {
        return [];
    }
}

function saveCompletedExercise(dayKey, exerciseIndex, completed) {
    const key = getStorageKey(dayKey);
    let completedList = getCompletedExercises(dayKey);

    if (completed) {
        if (!completedList.includes(exerciseIndex)) {
            completedList.push(exerciseIndex);
        }
    } else {
        completedList = completedList.filter(idx => idx !== exerciseIndex);
    }

    localStorage.setItem(key, JSON.stringify(completedList));
}

function resetDayProgress(dayKey) {
    const key = getStorageKey(dayKey);
    localStorage.removeItem(key);
}

function init() {
    currentDayKey = getDayKeyFromDate();
    renderNav();
    renderWorkout();
}

function getDayKeyFromDate() {
    const todayIndex = new Date().getDay();
    return weekdayKeys[todayIndex] || 'segunda';
}

function renderNav() {
    const todayKey = getDayKeyFromDate();
    navContainer.innerHTML = '';

    daysMap.forEach(day => {
        const hasWorkout = workoutData[day.key].exercises.length > 0;
        const isActive = day.key === currentDayKey;
        const isToday = day.key === todayKey;

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = [
            'day-btn',
            isActive ? 'active' : '',
            hasWorkout ? 'has-workout' : '',
            isToday ? 'is-today' : '',
        ].filter(Boolean).join(' ');
        btn.innerText = day.label;
        btn.setAttribute('aria-pressed', isActive);
        btn.setAttribute('aria-label', `${day.label}${isToday ? ' (hoje)' : ''}${hasWorkout ? ', com treino' : ', sem treino'}`);

        btn.onclick = () => {
            if (currentDayKey === day.key) return;
            currentDayKey = day.key;
            renderNav();
            renderWorkout();
        };

        navContainer.appendChild(btn);
    });

    setTimeout(() => {
        const activeBtn = document.querySelector('.day-btn.active');
        if (activeBtn) {
            activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }, 100);
}

function renderWorkout() {
    const data = workoutData[currentDayKey];
    contentContainer.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.className = 'workout-day-card';

    const completedExercises = getCompletedExercises(currentDayKey);

    const headerEl = document.createElement('div');
    const exerciseCount = data.exercises.length;
    const completedCount = completedExercises.length;
    const badgeLabel = exerciseCount === 0 ? 'Descanso' : `${exerciseCount} exercício${exerciseCount !== 1 ? 's' : ''}`;

    const dayLabel = daysMap.find(d => d.key === currentDayKey)?.label || currentDayKey.toUpperCase().slice(0, 3);

    headerEl.innerHTML = `
        <div class="session-header">
            <div class="section-title">
                ${data.title}
            </div>
            <div style="display: flex; gap: 0.5rem; align-items: center;">
                <div class="session-badge" aria-label="${badgeLabel}">
                    <svg class="session-badge-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    <span>${badgeLabel}</span>
                </div>
                ${exerciseCount > 0 && completedCount > 0 ? `
                    <button class="reset-day-btn" type="button" aria-label="Resetar progresso do dia ${dayLabel}">
                        RESET [${dayLabel}]
                    </button>
                ` : ''}
            </div>
        </div>
        <div class="focus-text">
            FOCO: <strong>${data.focus}</strong>
            ${exerciseCount > 0 && completedCount > 0 ? `<span style="color: var(--accent); margin-left: 0.5rem;">[${completedCount}/${exerciseCount}]</span>` : ''}
        </div>
        ${exerciseCount > 0 ? '<p class="instruction-text">Clique no exercício para marcá-lo como feito.</p>' : ''}
    `;
    wrapper.appendChild(headerEl);

    if (exerciseCount > 0 && completedCount > 0) {
        const resetBtn = headerEl.querySelector('.reset-day-btn');
        resetBtn.onclick = () => {
            showResetModal(dayLabel, currentDayKey);
        };
    }

    if (data.exercises.length === 0) {
        const restCard = document.createElement('div');
        restCard.className = 'card card-rest';
        restCard.innerHTML = `
            <div class="exercise-icon exercise-icon-rest">OFF</div>
            <div class="card-rest-content">
                <h3 class="exercise-name">DIA OFF</h3>
                <p class="focus-text">SE RECUPERE</p>
            </div>
        `;
        wrapper.appendChild(restCard);
    } else {
        const listEl = document.createElement('div');
        listEl.className = 'exercise-list';
        listEl.setAttribute('role', 'list');

        data.exercises.forEach((ex, index) => {
            const isCompleted = completedExercises.includes(index);
            const card = document.createElement('div');
            card.className = `card muscle-${ex.muscle} ${isCompleted ? 'completed' : ''}`;
            card.setAttribute('role', 'listitem');
            card.style.animation = `fadeIn 0.2s ease-out ${index * 0.04}s backwards`;

            const muscleLabel = ex.muscle.charAt(0).toUpperCase() + ex.muscle.slice(1);
            const exerciseId = `${currentDayKey}-${index}`;

            card.innerHTML = `
                <label class="exercise-checkbox-wrapper" for="${exerciseId}">
                    <input 
                        type="checkbox" 
                        id="${exerciseId}" 
                        class="exercise-checkbox" 
                        ${isCompleted ? 'checked' : ''}
                        aria-label="Marcar ${ex.name} como concluído"
                    />
                    <span class="checkbox-custom"></span>
                </label>
                <div class="card-body">
                    <div class="card-header">
                        <span class="exercise-name">${ex.name}</span>
                    </div>
                    <div class="tags">
                        <span class="tag tag-${ex.muscle}">${ex.muscle}</span>
                    </div>
                    <div class="sets-reps">
                        <div class="metric">
                            <strong>${ex.sets}</strong>
                            <span>Séries</span>
                        </div>
                        <div class="metric">
                            <strong>${ex.reps}</strong>
                            <span>Reps</span>
                        </div>
                    </div>
                </div>
            `;

            const checkbox = card.querySelector('.exercise-checkbox');
            checkbox.onchange = (e) => {
                const completed = e.target.checked;
                saveCompletedExercise(currentDayKey, index, completed);
                card.classList.toggle('completed', completed);

                const completedNow = getCompletedExercises(currentDayKey);
                const focusText = wrapper.querySelector('.focus-text');
                const countSpan = focusText.querySelector('span[style*="color: var(--accent)"]');
                if (completedNow.length > 0) {
                    if (countSpan) {
                        countSpan.textContent = `[${completedNow.length}/${exerciseCount}]`;
                    } else {
                        const newSpan = document.createElement('span');
                        newSpan.style.color = 'var(--accent)';
                        newSpan.style.marginLeft = '0.5rem';
                        newSpan.textContent = `[${completedNow.length}/${exerciseCount}]`;
                        focusText.appendChild(newSpan);
                    }

                    if (!wrapper.querySelector('.reset-day-btn')) {
                        const sessionHeader = wrapper.querySelector('.session-header');
                        const dayLabel = daysMap.find(d => d.key === currentDayKey)?.label || currentDayKey.toUpperCase().slice(0, 3);
                        const resetBtn = document.createElement('button');
                        resetBtn.className = 'reset-day-btn';
                        resetBtn.type = 'button';
                        resetBtn.textContent = `RESET [${dayLabel}]`;
                        resetBtn.setAttribute('aria-label', `Resetar progresso do dia ${dayLabel}`);
                        resetBtn.onclick = () => {
                            showResetModal(dayLabel, currentDayKey);
                        };
                        sessionHeader.querySelector('div[style*="display: flex"]').appendChild(resetBtn);
                    }
                } else {
                    if (countSpan) countSpan.remove();
                    const resetBtn = wrapper.querySelector('.reset-day-btn');
                    if (resetBtn) resetBtn.remove();
                }
            };

            listEl.appendChild(card);
        });
        wrapper.appendChild(listEl);
    }

    if (data.cardio && data.cardio !== "OFF") {
        const cardioEl = document.createElement('div');
        cardioEl.className = 'cardio-card';
        cardioEl.style.animation = `fadeIn 0.2s ease-out ${data.exercises.length * 0.04 + 0.1}s backwards`;
        cardioEl.innerHTML = `
            <h3>CARDIO DO DIA</h3>
            <p>${data.cardio}</p>
        `;
        wrapper.appendChild(cardioEl);
    }

    contentContainer.appendChild(wrapper);
}

function showResetModal(dayLabel, dayKey) {
    const modal = document.getElementById('reset-modal');
    const message = document.getElementById('modal-message');
    const confirmBtn = modal.querySelector('.modal-btn-confirm');
    const cancelBtn = modal.querySelector('.modal-btn-cancel');

    message.textContent = `TODOS OS EXERCÍCIOS DE ${dayLabel} SERÃO DESMARCADOS.`;
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('active');

    const newConfirmBtn = confirmBtn.cloneNode(true);
    const newCancelBtn = cancelBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);
    cancelBtn.parentNode.replaceChild(newCancelBtn, cancelBtn);

    newConfirmBtn.onclick = () => {
        resetDayProgress(dayKey);
        renderWorkout();
        hideResetModal();
    };

    newCancelBtn.onclick = hideResetModal;

    const overlay = modal.querySelector('.modal-overlay');
    overlay.onclick = hideResetModal;

    const escHandler = (e) => {
        if (e.key === 'Escape') {
            hideResetModal();
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);
}

function hideResetModal() {
    const modal = document.getElementById('reset-modal');
    modal.setAttribute('aria-hidden', 'true');
    modal.classList.remove('active');
}

document.addEventListener('DOMContentLoaded', init);
