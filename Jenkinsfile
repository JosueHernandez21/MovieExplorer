pipeline { 
    agent any

    tools {
        nodejs 'Node18'
    }

    environment {
        IMAGE_NAME = 'movie-explorer'
        CONTAINER_NAME = 'movie-explorer'
        PORT = '8081'
    }

    stages {

        stage('Instalar dependencias') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build Angular') {
            steps {
                bat 'npm run build -- --configuration=production'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t %IMAGE_NAME% .'
            }
        }

        stage('Deploy Container') {
            steps {
                bat '''
                docker stop %CONTAINER_NAME% || exit 0
                docker rm %CONTAINER_NAME% || exit 0
                docker run -d -p %PORT%:80 --name %CONTAINER_NAME% %IMAGE_NAME%
                '''
            }
        }
    }
}