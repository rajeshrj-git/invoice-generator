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
        stage('🚀 Deploy - Debug Mode') {
            environment {
                GIT_REPO_URL = "https://${GITHUB_TOKEN}@github.com/rajeshrj-git/invoice-generator.git"
            }
            steps {
                script {
                    // Debug: Check everything before deploying
                    sh '''
                        echo "=== DEBUGGING DEPLOY SETUP ==="
                        echo "Node version: $(node --version)"
                        echo "NPM version: $(npm --version)"
                        echo "Git version: $(git --version)"
                        echo "Token length: ${#GITHUB_TOKEN}"
                        echo "Build directory exists: $(ls -la build/ | head -5)"
                        
                        # Check if gh-pages is available
                        echo "Checking gh-pages availability..."
                        npx gh-pages --version || echo "gh-pages not found, will install"
                        
                        # Test git authentication without pushing
                        echo "Testing git access..."
                        git ls-remote "${GIT_REPO_URL}" || echo "Git auth failed"
                    '''
                    
                    // Only deploy if everything looks good
                    sh '''
                        echo "=== STARTING DEPLOYMENT ==="
                        git config --global user.email "deploy@invoice-generator.ci"
                        git config --global user.name "Jenkins Deploy Bot"
                        
                        # Deploy to GitHub Pages
                        npx gh-pages --dist build \
                            --repo "${GIT_REPO_URL}" \
                            --user "Jenkins Deploy Bot <deploy@invoice-generator.ci>" \
                            --message "Deploy from Jenkins build ${BUILD_NUMBER}"
                    '''
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
            sh '''
                echo "=== FAILURE DEBUG INFO ==="
                echo "Current directory: $(pwd)"
                echo "Git status: $(git status)"
                echo "Git remotes: $(git remote -v)"
                ls -la build/ || echo "No build directory"
            '''
        }
        always {
            sh 'rm -rf ~/.npm ~/.cache'  
        }
    }
}