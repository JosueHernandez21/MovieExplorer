pipeline { 
    agent any

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    tools {
        nodejs 'Node18'
    }

    environment {
        IMAGE_NAME = 'movie-explorer'
        CONTAINER_NAME = 'movie-explorer'
        PORT = '8081'
    }

    stages { 

        stage('Run Tests') {
            steps {
                bat 'npm install'
                bat 'set CHROME_BIN="C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" && npm run test -- --watch=false --browsers=ChromeHeadless --no-sandbox --disable-gpu'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t %IMAGE_NAME%:%BUILD_NUMBER% .'
            }
        }

        stage('Deploy Container') {
            steps {
                bat '''
                docker stop %CONTAINER_NAME% || exit 0
                docker rm %CONTAINER_NAME% || exit 0
                docker run -d -p %PORT%:80 --name %CONTAINER_NAME% %IMAGE_NAME%:%BUILD_NUMBER%
                '''
            }
        }
    }
}