const readline = require('readline');

const escolha = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Objeto do personagem
class PersonagemTipo {
    constructor(classePersonagem, magiaPersonagem) {
        this.classePersonagem = classePersonagem;
        this.magiaPersonagem = magiaPersonagem;
    }

    usarMagia() {
        console.log(`O ${this.classePersonagem} usou ${this.magiaPersonagem}`);
    }
}

let personagemEscolhido;
let nome;

// Verificações se o usuário quer atacar
function fazerPergunta() {
    escolha.question('Gostaria de atacar? (sim/não): ', (resposta) => {
        if (['sim', 's', 'yes', 'y'].includes(resposta.toLowerCase())) {
            // Se a resposta for 'sim', usar a magia
            personagemEscolhido.usarMagia();
            escolha.close();
        } else if (['não', 'n', 'no'].includes(resposta.toLowerCase())) {
            // Se a resposta for 'não', fazer a pergunta novamente
            fazerPergunta();
        } else {
            // Se a resposta não for válida, pedir novamente
            console.log('Resposta inválida. Por favor, responda com "sim" ou "não".');
            fazerPergunta();
        }
    });
}

// Pergunta do nome do usuário
function nomeUsuario() {
    escolha.question('Qual é o seu nome? ', (resposta) => {
        nome = resposta;
        if (nome.length < 3) {
            console.log('Seu nome deve conter no mínimo 3 caracteres.');
            escolha.close();
            return;
        }
        // Continue com a escolha do personagem após coletar o nome
        escolhaClassePersonagem();
    });
}

// Escolha do personagem
function escolhaClassePersonagem() {
    escolha.question(`${nome}, escolha a classe do personagem (Mago, Guerreiro, Monge, Ninja): `, (escolhaUsuario) => {
        // Criar instância da classe com base na escolha do usuário
        switch (escolhaUsuario.toLowerCase()) {
            case 'mago':
                personagemEscolhido = new PersonagemTipo('Mago', 'magia');
                break;
            case 'guerreiro':
                personagemEscolhido = new PersonagemTipo('Guerreiro', 'espada');
                break;
            case 'monge':
                personagemEscolhido = new PersonagemTipo('Monge', 'artes marciais');
                break;
            case 'ninja':
                personagemEscolhido = new PersonagemTipo('Ninja', 'shuriken');
                break;
            default:
                console.log('Classe inválida. Escolha entre Mago, Guerreiro, Monge ou Ninja.');
                escolha.close();
                return;
        }

        // Perguntar se o usuário quer atacar
        fazerPergunta();
    });
}

// Iniciar o processo perguntando o nome do usuário
nomeUsuario();