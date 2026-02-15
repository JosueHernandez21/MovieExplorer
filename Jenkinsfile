pipeline { 
    agent any

    tools {
        nodejs 'Node18'
    }

    stages {

        stage('Instalar dependencias') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build Angular') {
            steps {
                sh 'npm run build -- --configuration=production'
            }
        }

        stage('Archivar artefacto') {
            steps {
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
            }
        }
    }
}