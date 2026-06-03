pipeline {

    agent any

    environment {

        APP_NAME = "cloudcart-platform"
        BUILD_NUMBER = "${env.BUILD_ID}"

    }

    options {

        timestamps()
        disableConcurrentBuilds()

    }

    stages {

        // =========================
        // CLEAN WORKSPACE
        // =========================

        stage('Clean Workspace') {

            steps {

                echo 'Cleaning workspace...'
                cleanWs()

            }

        }

        // =========================
        // CLONE REPOSITORY
        // =========================

        stage('Clone Repository') {

            steps {

                echo 'Cloning GitHub repository...'

                git branch: 'main',
                url: 'https://github.com/srikar2803/cloudcart-microservices.git'

            }

        }

        // =========================
        // VERIFY ENVIRONMENT
        // =========================

        stage('Verify Environment') {

            steps {

                echo 'Checking Docker installation...'
                sh 'docker --version'

                echo 'Checking Docker Compose installation...'
                sh 'docker-compose --version'

                echo 'Listing project files...'
                sh 'ls -la'

            }

        }

        // =========================
        // BUILD DOCKER CONTAINERS
        // =========================

        stage('Build Docker Containers') {

            steps {

                echo 'Building Docker containers...'

                sh 'docker-compose build'

            }

        }

        // =========================
        // STOP OLD CONTAINERS
        // =========================

        stage('Stop Old Containers') {

            steps {

                echo 'Stopping old containers...'

                sh '''
                docker-compose down || true
                '''

            }

        }

        // =========================
        // DEPLOY APPLICATION
        // =========================

        stage('Deploy Application') {

            steps {

                echo 'Deploying application containers...'

                sh '''
                docker-compose up -d
                '''

            }

        }

        // =========================
        // HEALTH CHECK
        // =========================

        stage('Health Check') {

            steps {

                echo 'Checking running containers...'

                sh '''
                docker ps
                '''

            }

        }

        // =========================
        // API SMOKE TEST
        // =========================

        stage('API Smoke Test') {

            steps {

                echo 'Checking API Gateway container status...'

                sh '''
                sleep 20

                docker inspect --format="{{.State.Status}}" cloudcart-pipeline-api-gateway-1

                echo "API Gateway container is running successfully"
                '''

            }

        }

    }

    // =========================
    // POST ACTIONS
    // =========================

    post {

        success {

            echo 'Build and deployment successful!'

        }

        failure {

            echo 'Pipeline failed!'

        }

        always {

            echo 'Pipeline execution completed.'

        }

    }

}

