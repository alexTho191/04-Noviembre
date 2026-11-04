// --- CONFIGURACIÓN DE TEMA VISUAL ---
function setTheme(theme) {
    const body = document.getElementById('app-body');
    body.className = body.className.replace(/theme-\w+/, `theme-${theme}`);
    localStorage.setItem('nuestro_tema', theme);
}

const savedTheme = localStorage.getItem('nuestro_tema');
if (savedTheme) {
    setTheme(savedTheme);
}

// --- CONTADOR DE TIEMPO EN VIVO ---
const fechaInicio = new Date("2026-10-23T19:00:00");

function actualizarContador() {
    const ahora = new Date();
    const diferencia = ahora - fechaInicio;

    if (diferencia > 0) {
        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
        const minutos = Math.floor((diferencia / 1000 / 60) % 60);
        
        const counterEl = document.getElementById('sidebar-counter');
        if (counterEl) {
            counterEl.textContent = `${dias} días, ${horas}h y ${minutos}m juntos ✨`;
        }
    }
}
setInterval(actualizarContador, 1000);
actualizarContador();

// --- SISTEMA DE PESTAÑAS (SPA) ---
const navBtns = document.querySelectorAll('.nav-btn');
const tabContents = document.querySelectorAll('.tab-content');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebar-overlay');

function toggleMobileMenu() {
    sidebar.classList.toggle('-translate-x-full');
    sidebarOverlay.classList.toggle('hidden');
}

mobileMenuBtn.addEventListener('click', toggleMobileMenu);
sidebarOverlay.addEventListener('click', toggleMobileMenu);

navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');

        tabContents.forEach(tab => tab.classList.add('hidden'));
        document.getElementById(targetId).classList.remove('hidden');

        navBtns.forEach(b => {
            b.classList.remove('text-white', 'bg-neutral-900/90', 'border-neutral-800/80', 'shadow-lg');
            b.classList.add('text-neutral-400', 'border-transparent');
            const icon = b.querySelector('i');
            icon.classList.remove('text-accent');
        });

        btn.classList.remove('text-neutral-400', 'border-transparent');
        btn.classList.add('text-white', 'bg-neutral-900/90', 'border-neutral-800/80', 'shadow-lg');
        btn.querySelector('i').classList.add('text-accent');

        if (window.innerWidth < 768) {
            toggleMobileMenu();
        }
    });
});

// --- LÓGICA DEL REPRODUCTOR PROFESIONAL ---
const playlist = [
    {
        id: 1,
        title: "A Donde Vamos",
        artist: "Morat",
        cover: "img/foto1.jpg",
        src: "audio/cancion1.mp3",
        duration: "3:22"
    },
    {
        id: 2,
        title: "Te Regalo",
        artist: "Rels B",
        cover: "img/foto2.jpg",
        src: "audio/cancion2.mp3",
        duration: "2:27"
    },
    {
        id: 3,
        title: "Bendita Tu Luz",
        artist: "Maná & Juan Luis Guerra",
        cover: "img/foto3.jpg",
        src: "audio/cancion3.mp3",
        duration: "4:24"
    },
    {
        id: 4,
        title: "Me Enamora",
        artist: "Juanes",
        cover: "img/foto4.jpg",
        src: "audio/cancion4.mp3",
        duration: "3:12"
    },
    {
        id: 5,
        title: "Tu Jardin Con Enanitos",
        artist: "Melendi",
        cover: "img/foto5.jpg",
        src: "audio/cancion5.mp3",
        duration: "4:27"
    },
    {
        id: 6,
        title: "Aprender a Quererte",
        artist: "Morat",
        cover: "img/foto6.jpg",
        src: "audio/cancion6.mp3",
        duration: "3:50"
    },
    {
        id: 7,
        title: "Hecha Pa' Mi",
        artist: "Grupo Frontera",
        cover: "img/foto7.jpg",
        src: "audio/cancion7.mp3",
        duration: "3:14"
    },
    {
        id: 8,
        title: "Tu Llenas mi Vida",
        artist: "Kalimba",
        cover: "img/foto8.jpg",
        src: "audio/cancion8.mp3",
        duration: "3:37"
    },
    {
        id: 9,
        title: "Es Por Ti",
        artist: "Juanes",
        cover: "img/foto9.jpg",
        src: "audio/cancion9.mp3",
        duration: "3:50"
    },
    {
        id: 10,
        title: "Yo Contigo, Tú Conmigo",
        artist: "Morat & Álvaro Soler",
        cover: "img/foto10.jpg",
        src: "audio/cancion10.mp3",
        duration: "2:57"
    },
    {
        id: 11,
        title: "Mi Vida Entera",
        artist: "Morat",
        cover: "img/foto11.jpg",
        src: "audio/cancion11.mp3",
        duration: "3:10"
    },
    {
        id: 12,
        title: "Amarte a la Antigua",
        artist: "Pedro Fernández",
        cover: "img/foto12.jpg",
        src: "audio/cancion12.mp3",
        duration: "3:38"
    },
    {
        id: 13,
        title: "Me Cambiaste la Vida",
        artist: "Rio Roma",
        cover: "img/foto13.jpg",
        src: "audio/cancion1.mp3",
        duration: "3:22"
    },
    {
        id: 14,
        title: "Te Mando Flores",
        artist: "Fonseca",
        cover: "img/foto14.jpg",
        src: "audio/cancion14.mp3",
        duration: "3:48"
    },
    {
        id: 15,
        title: "Mix Amor Sincero",
        artist: "Amor Rebelde",
        cover: "img/foto15.jpg",
        src: "audio/cancion15.mp3",
        duration: "5:16"
    },
    {
        id: 16,
        title: "Humanos a Marte",
        artist: "Chayanne",
        cover: "img/foto16.jpg",
        src: "audio/cancion16.mp3",
        duration: "3:40"
    }
];

document.getElementById('total-tracks-count').textContent = `${playlist.length} Canciones`;
document.getElementById('profile-tracks-count').textContent = playlist.length;

function getLikes() {
    const data = localStorage.getItem('canciones_likes');
    return data ? JSON.parse(data) : {};
}

function saveLikes(likes) {
    localStorage.setItem('canciones_likes', JSON.stringify(likes));
}

let currentTrackIndex = 0;
let isRemainingTimeMode = false;
const audio = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const playIcon = document.getElementById('play-icon');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const currentCover = document.getElementById('current-cover');
const currentTitle = document.getElementById('current-title');
const currentArtist = document.getElementById('current-artist');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const totalDurationEl = document.getElementById('total-duration');
const playlistContainer = document.getElementById('playlist-container');
const likeBtn = document.getElementById('like-btn');
const volumeSlider = document.getElementById('volume-slider');
const eqAnimation = document.getElementById('eq-animation');

function renderPlaylist() {
    playlistContainer.innerHTML = '';
    const likes = getLikes();

    playlist.forEach((track, index) => {
        const isCurrent = index === currentTrackIndex;
        const isLiked = likes[track.id] || false;

        const div = document.createElement('div');
        div.className = `flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition-all duration-200 ${isCurrent ? 'bg-neutral-800/90 border border-neutral-700/80 shadow-xl' : 'hover:bg-neutral-800/40 border border-transparent'}`;
        div.innerHTML = `
            <div class="flex items-center space-x-3.5">
                <span class="text-xs font-bold ${isCurrent ? 'text-accent' : 'text-neutral-500'} w-5 text-center">${index + 1}</span>
                <div class="relative w-11 h-11 rounded-xl overflow-hidden shrink-0 shadow-md">
                    <img src="${track.cover}" class="w-full h-full object-cover" alt="cover">
                </div>
                <div>
                    <h4 class="text-sm font-bold ${isCurrent ? 'text-accent' : 'text-white'} truncate max-w-[150px] sm:max-w-[190px]">${track.title}</h4>
                    <p class="text-xs text-neutral-400 font-medium">${track.artist}</p>
                </div>
            </div>
            <div class="flex items-center space-x-3">
                <button onclick="event.stopPropagation(); toggleSongLike(${track.id})" class="text-lg transition transform hover:scale-125 ${isLiked ? 'text-red-500' : 'text-neutral-600 hover:text-neutral-400'}">
                    <i class="fa-${isLiked ? 'solid' : 'regular'} fa-heart"></i>
                </button>
                <span class="text-xs font-semibold text-neutral-500">${track.duration}</span>
            </div>
        `;
        div.addEventListener('click', () => {
            currentTrackIndex = index;
            loadTrack(currentTrackIndex);
            playAudio();
        });
        playlistContainer.appendChild(div);
    });
}

window.toggleSongLike = function(trackId) {
    let likes = getLikes();
    likes[trackId] = !likes[trackId];
    saveLikes(likes);
    renderPlaylist();
    updateMainLikeButton();
};

function updateMainLikeButton() {
    const currentTrack = playlist[currentTrackIndex];
    const likes = getLikes();
    const isLiked = likes[currentTrack.id] || false;
    const icon = likeBtn.querySelector('i');
    
    if (isLiked) {
        likeBtn.classList.add('text-red-500');
        likeBtn.classList.remove('text-neutral-300');
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid');
    } else {
        likeBtn.classList.remove('text-red-500');
        likeBtn.classList.add('text-neutral-300');
        icon.classList.remove('fa-solid');
        icon.classList.add('fa-regular');
    }
}

function loadTrack(index) {
    const track = playlist[index];
    currentCover.src = track.cover;
    currentTitle.textContent = track.title;
    currentArtist.textContent = track.artist;
    audio.src = track.src;
    totalDurationEl.textContent = track.duration;
    renderPlaylist();
    updateMainLikeButton();
}

function playAudio() {
    audio.play().then(() => {
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
        if(eqAnimation) {
            eqAnimation.style.opacity = '1';
            eqAnimation.classList.add('eq-active');
        }
    }).catch(error => {
        console.log("Reproducción simulada o archivo pendiente:", error);
    });
}

function pauseAudio() {
    audio.pause();
    playIcon.classList.remove('fa-pause');
    playIcon.classList.add('fa-play');
    if(eqAnimation) {
        eqAnimation.style.opacity = '0';
        eqAnimation.classList.remove('eq-active');
    }
}

playBtn.addEventListener('click', () => {
    if (audio.paused) {
        playAudio();
    } else {
        pauseAudio();
    }
});

prevBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
    playAudio();
});

nextBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    playAudio();
});

audio.addEventListener('ended', () => {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    playAudio();
});

function formatTime(seconds) {
    let mins = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    if (secs < 10) secs = `0${secs}`;
    return `${mins}:${secs}`;
}

audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const percent = (audio.currentTime / audio.duration) * 100;
        progress.style.width = `${percent}%`;
        
        currentTimeEl.textContent = formatTime(audio.currentTime);

        if (isRemainingTimeMode) {
            const timeLeft = audio.duration - audio.currentTime;
            totalDurationEl.textContent = `-${formatTime(timeLeft)}`;
        } else {
            totalDurationEl.textContent = formatTime(audio.duration);
        }
    }
});

totalDurationEl.addEventListener('click', () => {
    isRemainingTimeMode = !isRemainingTimeMode;
});

let isDraggingProgress = false;

function scrubProgress(e) {
    const rect = progressContainer.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    let clickX = clientX - rect.left;
    let width = progressContainer.clientWidth;
    
    if (clickX < 0) clickX = 0;
    if (clickX > width) clickX = width;

    if (audio.duration) {
        const percent = clickX / width;
        progress.style.width = `${percent * 100}%`;
        audio.currentTime = percent * audio.duration;
    }
}

progressContainer.addEventListener('mousedown', (e) => {
    isDraggingProgress = true;
    scrubProgress(e);
});

window.addEventListener('mousemove', (e) => {
    if (isDraggingProgress) {
        scrubProgress(e);
    }
});

window.addEventListener('mouseup', () => {
    isDraggingProgress = false;
});

progressContainer.addEventListener('touchstart', (e) => {
    isDraggingProgress = true;
    scrubProgress(e);
});

window.addEventListener('touchmove', (e) => {
    if (isDraggingProgress) {
        scrubProgress(e);
    }
});

window.addEventListener('touchend', () => {
    isDraggingProgress = false;
});

volumeSlider.addEventListener('input', (e) => { audio.volume = e.target.value; });
volumeSlider.addEventListener('change', (e) => { audio.volume = e.target.value; });

likeBtn.addEventListener('click', () => {
    const currentTrack = playlist[currentTrackIndex];
    toggleSongLike(currentTrack.id);
});

// --- PENSAMIENTOS ESTÁTICOS (CONTROLADOS DESDE EL CÓDIGO) ---
const thoughtsList = [
    { tag: "El Comienzo", title: "El día que todo cambió", desc: "Desde que empecé a conocerte, supe que había algo muy especial en ti." },
    { tag: "Complicidad", title: "Risas y silencios", desc: "No hay nadie con quien el tiempo pase tan volando. Contigo puedo ser 100% yo, valorando cada momento y cada conversación." }
];

function renderThoughts() {
    const grid = document.getElementById('thoughts-grid');
    if (!grid) return;
    
    document.getElementById('profile-thoughts-count').textContent = thoughtsList.length;

    grid.innerHTML = '';
    thoughtsList.forEach(item => {
        const card = document.createElement('div');
        card.className = "bg-gradient-to-br from-neutral-900/90 to-neutral-950 border border-neutral-800/80 p-7 rounded-[2rem] shadow-xl hover:border-accent/40 transition group flex flex-col justify-between";
        card.innerHTML = `
            <div>
                <div class="flex justify-between items-start mb-3">
                    <span class="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">${item.tag}</span>
                </div>
                <h3 class="text-xl font-bold mt-2 mb-2.5 group-hover:text-accent transition">${item.title}</h3>
                <p class="text-sm text-neutral-400 leading-relaxed font-light">${item.desc}</p>
            </div>
        `;
        grid.appendChild(card);
    });
}
renderThoughts();

// --- PRÓXIMOS PLANES ESTÁTICOS (CONTROLADOS DESDE EL CÓDIGO) ---
const plansList = [
    { title: "Viaje a la playa", desc: "Pendiente cuando se pueda.", completed: false },
    { title: "Cenar en nuestro restaurante favorito", desc: "Amorcito Falta escoger nuestro restaurante favorito jajaja", completed: false },
    { title: "Ver maratón de nuestras películas", desc: "Lunes 09 de Noviembre lo es todo bb", completed: false }
];

function renderPlans() {
    const grid = document.getElementById('plans-grid');
    if (!grid) return;
    
    const completedCount = plansList.filter(p => p.completed).length;
    document.getElementById('profile-plans-count').textContent = completedCount;

    grid.innerHTML = '';
    plansList.forEach(item => {
        const card = document.createElement('div');
        card.className = `border p-6 rounded-[2rem] shadow-xl transition flex flex-col justify-between ${item.completed ? 'bg-neutral-950/40 border-neutral-900 opacity-60' : 'bg-gradient-to-br from-neutral-900/90 to-neutral-950 border-neutral-800/80 hover:border-accent/40'}`;
        card.innerHTML = `
            <div>
                <div class="flex justify-between items-start mb-3">
                    <span class="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${item.completed ? 'bg-neutral-800 text-neutral-400' : 'bg-accent/10 text-accent border border-accent/20'}">${item.completed ? 'Completado ✅' : 'En la mira'}</span>
                </div>
                <h3 class="text-xl font-bold mt-2 mb-1.5 ${item.completed ? 'line-through text-neutral-500' : 'text-white'}">${item.title}</h3>
                <p class="text-xs text-neutral-400 font-light">${item.desc}</p>
            </div>
        `;
        grid.appendChild(card);
    });
}
renderPlans();

// --- GALERÍA DE FOTOS ESTÁTICA (BENTO GRID) ---
const photoList = [
    { url: "img/foto1.jpg", title: "Nuestra primera foto juntos", category: "momentos" },
    { url: "img/foto2.jpg", title: "Heladito saliendo del trabajo", category: "momentos" },
    { url: "img/foto3.jpg", title: "Mi bebé dandolo todo en la cuatrimoto", category: "viajes" },
    { url: "img/foto4.jpg", title: "Simplemente eres Hermosa", category: "viajes" },
    { url: "img/foto5.jpg", title: "Uyuyuy a donde tan guapa ", category: "viajes" },
    { url: "img/foto6.jpg", title: "Yo planeando caldito sin saber que no le gustaba el fideo jajaj", category: "momentos" },
    { url: "img/foto7.jpg", title: "Fotito de nuestro viaje", category: "viajes" },
    { url: "img/foto8.jpg", title: "Me invitaste Heladito", category: "viajes" },
    { url: "img/foto9.jpg", title: "Mi bebé jamás espectadora", category: "viajes" },
    { url: "img/foto10.jpg", title: "Agarrados de la mano", category: "viajes" },
    { url: "img/foto11.jpg", title: "Cevichito de trucha congelada jajajaja", category: "viajes" },
    { url: "img/foto12.jpg", title: "Noche de juegos uuu", category: "momentos" },
    { url: "img/foto13.jpg", title: "Heladito de nuevo jijiji", category: "momentos" },
    { url: "img/foto14.jpg", title: "Una sorpresa no tan sorpresiva jajajajaja", category: "momentos" },
    { url: "img/foto15.jpg", title: "Dile a Goku que me enseñe a teletransportarme", category: "momentos" },
    { url: "img/foto16.jpg", title: "Te quierooooooooooo", category: "momentos" }
];

function renderPhotos(filter = 'all') {
    const grid = document.getElementById('photo-grid');
    if (!grid) return;

    grid.innerHTML = '';
    const filteredPhotos = filter === 'all' ? photoList : photoList.filter(p => p.category === filter);

    filteredPhotos.forEach(photo => {
        const div = document.createElement('div');
        div.className = "group relative h-72 sm:h-80 rounded-[2.2rem] overflow-hidden bg-neutral-900 border border-neutral-800/60 shadow-xl cursor-pointer transition-all duration-500 hover:border-accent/40 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-accent/5";
        div.innerHTML = `
            <img src="${photo.url}" alt="${photo.title}" class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105">
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span class="text-[10px] font-extrabold uppercase tracking-widest text-accent mb-1.5 bg-accent/10 px-3 py-1 rounded-full w-max border border-accent/20">${photo.category}</span>
                <p class="text-sm font-bold text-white leading-snug">${photo.title}</p>
            </div>
        `;
        div.addEventListener('click', () => {
            lightboxImg.src = photo.url;
            lightboxModal.classList.remove('hidden');
        });
        grid.appendChild(div);
    });
}

// Filtros de categoría de fotos
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
            b.classList.remove('bg-accent', 'text-black', 'shadow-md');
            b.classList.add('bg-neutral-900', 'text-neutral-400', 'border', 'border-neutral-800/80');
        });
        btn.classList.remove('bg-neutral-900', 'text-neutral-400', 'border', 'border-neutral-800/80');
        btn.classList.add('bg-accent', 'text-black', 'shadow-md');
        
        renderPhotos(btn.getAttribute('data-filter'));
    });
});

// --- GENERADOR DE RAZONES DE AMOR ---
const razonesAmor = [
    "Me encanta tu risa, es lo primero que quiero escuchar todas las mañanas.",
    "Eres mi refugio seguro cuando el mundo se pone pesado.",
    "Adoro cómo me miras cuando hablamos de nuestras tonterías favoritas.",
    "Haces que cualquier lugar ordinario se sienta como el mejor lugar del mundo.",
    "Tienes la paciencia y el corazón más bonitos que conozco.",
    "Cada detalle tuyo hace que me enamore un poquito más cada día."
];

window.mostrarRazonAleatoria = function() {
    const box = document.getElementById('reason-box');
    const randomIndex = Math.floor(Math.random() * razonesAmor.length);
    box.textContent = `"${razonesAmor[randomIndex]}"`;
};

// --- LIGHTBOX GLOBAL ---
const lightboxModal = document.getElementById('lightbox-modal');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.getElementById('close-lightbox');

if (closeLightbox) {
    closeLightbox.addEventListener('click', () => lightboxModal.classList.add('hidden'));
    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) lightboxModal.classList.add('hidden');
    });
}

// Inicializaciones
loadTrack(currentTrackIndex);
renderPhotos('all');