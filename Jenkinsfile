pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
        GITHUB_TOKEN = credentials('GITHUB_TOKEN')  
        REPO_URL = 'https://github.com/rajeshrj-git/invoice-generator.git'
    }

    options {
        timestamps()
    }

    stages {
        stage("Checkout") {
            steps {
                checkout scm
                echo "Checkout Done"
            }
        }

        stage("Install Dependencies") {
            steps {
                sh 'npm ci --include=dev'
                echo "Installation Successful ✅"
            }
        }

        stage("Build") {
            steps {
                echo "🔨 Building React app..."
                sh 'GENERATE_SOURCEMAP=false npm run build' 
                echo "Build Successful ✅"
            }
        }

        stage('Test') {
            steps {
                sh 'npm test -- --watchAll=false'
                echo "Testing Successful ✅"
            }
        }

        stage('Configure Git') {
            steps {
                sh '''
                    git config user.email "deploy@invoice-generator.ci"
                    git config user.name "Invoice Generator Deploy Bot"
                    git remote set-url origin ${REPO_URL}
                '''
                echo "Git Configured ✅"
            }
        }

        stage('Deploy') {
            steps {
                sh 'npm run deploy'
                echo "Deployed Successfully ✅"
                echo "Your app is live at: https://rajeshrj-git.github.io/invoice-generator"
            }
        }
    }

    post {
        success {
            echo "🎉 Pipeline executed successfully!"
        }
        failure {
            echo "❌ Pipeline failed — check logs above."
        }
        always {
            sh 'rm -rf ~/.npm ~/.cache'  
        }
    }
}