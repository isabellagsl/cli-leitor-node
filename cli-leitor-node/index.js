/**
 * Módulo nativo 'fs' (File System).
 * Essencial para operações de I/O (Input/Output) no disco, permitindo
 * que o JavaScript interaja diretamente com arquivos do sistema operacional.
 */
const fs = require('fs');

/**
 * Captura argumentos da linha de comando.
 * 'process.argv' é um array onde os índices [0] e [1] são reservados para
 * os caminhos do executável Node e do script atual.
 * O índice [2] é o primeiro argumento real fornecido pelo usuário.
 */
const caminhoDoArquivo = process.argv[2]; 

/**
 * Lê e exibe o conteúdo de um arquivo de texto de forma assíncrona.
 * * A assincronicidade é crucial aqui para evitar o bloqueio da thread
 * principal do Node.js enquanto o disco é acessado (operação lenta).
 * * @param {string} caminho - O caminho relativo ou absoluto do arquivo.
 */
function lerArquivo(caminho) {
    // Validação preventiva
    if (!caminho) {
        console.error("ERRO: Caminho do arquivo não fornecido.");
        console.log("Uso: node index.js <CAMINHO_DO_ARQUIVO>");
        // Encerra com código 1 para sinalizar falha a outros processos/scripts.
        process.exit(1);
    }

    /**
     * Executa a leitura.
     * Passa 'utf8' para garantir que os bytes lidos sejam interpretados
     * como texto legível, e não como um Buffer bruto.
     */
    fs.readFile(caminho, 'utf8', (erro, dados) => {
        // O padrão de callback (erro, resultado)
        // Sempre verificamos o 'erro' primeiro.
        if (erro) {
            console.error(`FALHA na leitura do arquivo: ${caminho}`);
            // 'erro.message' contém detalhes técnicos úteis para debug.
            console.error(`Detalhes técnicos: ${erro.message}`);
            process.exit(1);
        }

        //O arquivo foi lido e decodificado corretamente.
        console.log(`\n--- INÍCIO DO ARQUIVO: ${caminho} ---`);
        console.log(dados);
        console.log('--- FIM DO ARQUIVO ---\n');
    });
}

// inicia a execução com o argumento fornecido.
lerArquivo(caminhoDoArquivo);