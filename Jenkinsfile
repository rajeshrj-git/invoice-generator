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

        stage('🚀 Deploy') {
            environment {
                // This format ALWAYS works for GitHub PAT auth
                GIT_REPO_URL = "https://${GITHUB_TOKEN}@github.com/rajeshrj-git/invoice-generator.git"
            }
            steps {
                script {
                    // 1. Configure Git identity (MANDATORY)
                    sh '''
                        git config --global user.email "deploy@invoice-generator.ci"
                        git config --global user.name "Jenkins Deploy Bot"
                    '''
                    
                    // 2. DEBUG: Verify credentials (remove after testing)
                    sh 'echo "Token first 5 chars: ${GITHUB_TOKEN.substring(0,5)}..."'
                    
                    // 3. Deploy using DIRECT authenticated command
                    sh """
                        # Force-clean any existing deployment
                        git push --delete origin gh-pages || true
                        
                        # Deploy with explicit auth
                        npx gh-pages --dist build \
                            --repo "${GIT_REPO_URL}" \
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