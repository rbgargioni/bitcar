// DADOS INICIAIS (Caso não haja postagens salvas no navegador)
const defaultPosts = [
    {
        id: 1,
        title: "Revisão Completa de Sistema de Freios",
        content: "Mais um cliente rodando seguro! Efetuamos a troca de discos, pastilhas e fluído de freio de um carro de cliente do nosso bairro.",
        image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=400",
        date: "14/07/2026"
    },
    {
        id: 2,
        title: "Pintura e Funilaria Finalizada!",
        content: "Remoção total de riscos na lataria e repintura com tonalidade idêntica à original de fábrica. Seu veículo com cara de novo outra vez.",
        image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=400",
        date: "10/07/2026"
    }
];

// Elementos do DOM
const postsContainer = document.getElementById('posts-container');
const btnAdminPost = document.getElementById('btn-admin-post');
const postModal = document.getElementById('post-modal');
const closeModal = document.querySelector('.close-modal');
const postForm = document.getElementById('post-form');

// Inicializar Postagens no LocalStorage
if (!localStorage.getItem('biticar_posts')) {
    localStorage.setItem('biticar_posts', JSON.stringify(defaultPosts));
}

// Carregar e Exibir Postagens
function loadPosts() {
    postsContainer.innerHTML = '';
    const posts = JSON.parse(localStorage.getItem('biticar_posts'));

    posts.forEach(post => {
        const postCard = document.createElement('div');
        postCard.className = 'post-card';
        
        // Se não houver link de imagem, usa uma padrão de oficina
        const imgUrl = post.image || 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=400';

        postCard.innerHTML = `
            <img class="post-img" src="${imgUrl}" alt="${post.title}" onerror="this.src='https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=400'">
            <div class="post-content">
                <span class="post-date">${post.date}</span>
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <button class="delete-post-btn" onclick="deletePost(${post.id})">Excluir Post</button>
            </div>
        `;
        postsContainer.appendChild(postCard);
    });
}

// Modal de Postagem (Abrir / Fechar)
btnAdminPost.addEventListener('click', () => {
    // Simulação simples de controle (Rodrigo pode colocar uma senha se preferir)
    const senha = prompt("Apenas o Rodrigo pode publicar. Digite a senha de acesso (padrão: biticar):");
    if (senha === "biticar" || senha === "123") {
        postModal.style.display = 'flex';
    } else if (senha !== null) {
        alert("Senha incorreta!");
    }
});

closeModal.addEventListener('click', () => {
    postModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === postModal) {
        postModal.style.display = 'none';
    }
});

// Criar nova Postagem
postForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;
    const image = document.getElementById('post-image').value;
    
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

    const newPost = {
        id: Date.now(),
        title: title,
        content: content,
        image: image,
        date: formattedDate
    };

    const posts = JSON.parse(localStorage.getItem('biticar_posts'));
    posts.unshift(newPost); // Adiciona no início da lista para aparecer primeiro

    localStorage.setItem('biticar_posts', JSON.stringify(posts));
    
    postForm.reset();
    postModal.style.display = 'none';
    loadPosts();
});

// Deletar Postagem
window.deletePost = function(id) {
    if (confirm("Deseja mesmo excluir esta postagem?")) {
        let posts = JSON.parse(localStorage.getItem('biticar_posts'));
        posts = posts.filter(post => post.id !== id);
        localStorage.setItem('biticar_posts', JSON.stringify(posts));
        loadPosts();
    }
}

// Carregar ao iniciar a página
document.addEventListener('DOMContentLoaded', loadPosts);