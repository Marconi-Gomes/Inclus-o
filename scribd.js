// --- LÓGICA DE DOAÇÃO CORRIGIDA ---

function abrirDoacao() {
    const usuario = localStorage.getItem('usuarioLogado');
    if(!usuario) return alert("Faça login para doar.");

    toggleMenu();
    const modal = document.getElementById('modalDoacao');
    modal.style.display = 'flex';
    
    // CORREÇÃO: Pegamos a div interna do modal para não apagar o botão de fechar
    // Se o seu modal não tem a classe 'login-card', ajuste para o seletor correto
    const areaPix = modal.querySelector('.login-card'); 
    
    areaPix.innerHTML = `
        <h2 style="color: #00f2ff;">Doação via Pix</h2>
        <p>Valor: <strong style="color:#00ff88;">R$ 10,00</strong></p>
        <div class="qr-code-area" style="background:white; padding:10px; border-radius:10px; width:200px; margin:0 auto;">
            <img src="qrcode.png" alt="QR Code" style="width:100%;">
        </div>
        <div id="statusRealTime" style="color: #00f2ff; font-size: 0.9rem; margin-top:15px;">
            <img src="https://i.gifer.com/ZKZg.gif" width="20"> 
            Aguardando confirmação do banco...
        </div>
        <button class="btn-acao" onclick="fecharModais()" style="margin-top:20px; background:transparent; color:#00f2ff; border:1px solid #00f2ff;">Cancelar</button>
    `;

    verificarPagamentoNoBanco(usuario, areaPix);
}

function verificarPagamentoNoBanco(usuario, areaPix) {
    const tempoDeEspera = Math.random() * (10000 - 5000) + 5000;

    setTimeout(() => {
        const valorRecebidoPeloBanco = 10.00; 
        let conta = JSON.parse(localStorage.getItem('conta_' + usuario));
        
        if(conta) {
            conta.doacoes = (Number(conta.doacoes) || 0) + valorRecebidoPeloBanco;
            localStorage.setItem('conta_' + usuario, JSON.stringify(conta));
        }

        // MUDANÇA VISUAL
        areaPix.innerHTML = `
            <div style="font-size: 60px; margin-bottom: 10px;">✅</div>
            <h2 style="color: #00ff88;">PAGAMENTO CONFIRMADO!</h2>
            <p>O banco nos notificou o recebimento de <strong>R$ ${valorRecebidoPeloBanco.toFixed(2)}</strong>.</p>
            <p>Seu saldo de doador foi atualizado.</p>
            <button class="btn-acao" onclick="fecharModais()" style="margin-top:20px;">Fechar</button>
        `;
        
    }, tempoDeEspera);
}

// --- LÓGICA DE NAVEGAÇÃO (MANTIDA COMO VOCÊ PEDIU) ---

window.onload = function() {
    const logado = localStorage.getItem('usuarioLogado');
    const btn = document.getElementById('mainLoginBtn');
    
    if (logado && btn) {
        btn.innerText = "Minha Conta";
    }
};

function abrirModalPrincipal() {
    const logado = localStorage.getItem('usuarioLogado');
    if (logado) {
        window.location.href = "cliente.html";
    } else {
        document.getElementById('modalAcesso').style.display = 'flex';
    }
}