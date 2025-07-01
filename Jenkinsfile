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
            environment {
                // Use this exact format for token authentication
                AUTH_URL = "https://x-access-token:${GITHUB_TOKEN}@github.com/rajeshrj-git/invoice-generator.git"
            }
            steps {
                script {
                    // 1. Configure Git (critical for gh-pages commits)
                    sh '''
                        git config user.email "deploy@invoice-generator.ci"
                        git config user.name "Jenkins Deploy Bot"
                    '''
                    
                    // 2. Force update origin URL with authentication
                    sh """
                        git remote set-url origin ${AUTH_URL}
                        git config --get remote.origin.url  # Verify
                    """
                    
                    // 3. Deploy with explicit authentication
                    sh """
                        npx gh-pages --dist build \
                            --repo ${AUTH_URL} \
                            --user "Jenkins Deploy Bot <deploy@invoice-generator.ci>"
                    """
                }
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