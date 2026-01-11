pipeline {
    agent any
    environment {
        CLIENT_IMAGE = 'jenkins-demo-client'
        SERVER_IMAGE = 'jenkins-demo-server'
    }
    stages {
        stage('Clean Workspace'){
            steps{
                cleanWs()
            }
        }
        stage('Checkout') {
            steps {
                echo '📥 Cloning repository...'
                git branch: 'main',
                    url: 'https://github.com/Nileshshinde09/Jenkins-Deployment-Template.git'
            }
        }
        stage("Build Docker Image"){
            parallel {
                stage("Build Client Image"){
                    steps{
                          echo '🐳 Building client Docker image...'
                          dir("jenkins-demo-client"){
                            sh "docker build -t ${CLIENT_IMAGE}:${BUILD_NUMBER} -t ${CLIENT_IMAGE}:latest ."
                          }
                    }
                }
                stage('Build Server Image') {
                    steps {
                        echo '🐳 Building server Docker image...'
                        dir('jenkins-demo-server') {
                            sh "docker build -t ${SERVER_IMAGE}:${BUILD_NUMBER} -t ${SERVER_IMAGE}:latest ."
                        }
                    }
                }
            }
        }

        stage('Build & Test'){
            parallel{
                stage("Client Pipeline"){
                    stages{
                        stage("Build Client"){
                            steps{
                                echo "🔨 Building client in Docker..."
                                sh """
                                docker run --rm \
                                    -v \$(pwd)/jenkins-demo-client:/app \
                                    ${CLIENT_IMAGE}:latest \
                                    pnpm build
                                """
                            }
                        }
                        stage("Test Client"){
                            steps {
                                echo '🧪 Testing client in Docker...'
                                sh """
                                    docker run --rm \
                                    -v \$(pwd)/jenkins-demo-client:/app \
                                    ${CLIENT_IMAGE}:latest \
                                    pnpm test:e2e
                                """
                            }
                        }
                    }
                    post {
                        failure {
                            echo '❌ Client pipeline failed, but continuing...'
                        }
                    }
                }

                stage("Server Pipeline"){
                    stages{
                        stage("Build Server"){
                            steps{
                                echo "🔨 Building server in Docker..."
                                sh """
                                docker run --rm \
                                    -v \$(pwd)/jenkins-demo-server:/app \
                                    ${SERVER_IMAGE}:latest \
                                    pnpm build
                                """
                            }
                        }
                        stage("Test Server"){
                            steps {
                                echo '🧪 Testing server in Docker...'
                                sh """
                                    docker run --rm \
                                    -v \$(pwd)/jenkins-demo-server:/app \
                                    ${SERVER_IMAGE}:latest \
                                    pnpm test:e2e
                                """
                            }
                        }
                    }
                     post {
                        failure {
                            echo '❌ Server pipeline failed, but continuing...'
                        }
                    }
                }
            }
            failFast false
        }
    }
    post {
        success {
            echo '✅ All pipelines completed!'
        }
        failure {
            echo '⚠️ Some pipelines failed'
        }
        always {
            echo '🧹 Cleaning up...'
            sh 'docker system prune -f'
        }
    }
}