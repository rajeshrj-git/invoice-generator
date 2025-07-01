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
        stage('🚀 Deploy') {
            environment {
                GIT_REPO_URL = "https://${GITHUB_TOKEN}@github.com/rajeshrj-git/invoice-generator.git"
            }
            steps {
                script {
                    sh '''
                        # Configure git
                        git config --global user.email "deploy@invoice-generator.ci"
                        git config --global user.name "Jenkins Deploy Bot"
                        
                        # Test permissions first
                        echo "Testing repository write access..."
                        git ls-remote --exit-code "${GIT_REPO_URL}" refs/heads/gh-pages || echo "gh-pages branch doesn't exist yet"
                        
                        # Deploy with better error handling
                        echo "Deploying to GitHub Pages..."
                        npx gh-pages --dist build \
                            --repo "${GIT_REPO_URL}" \
                            --user "Jenkins Deploy Bot <deploy@invoice-generator.ci>" \
                            --message "Deploy from Jenkins build ${BUILD_NUMBER}" \
                            --dotfiles
                    '''
                }
            }
        }
    }
    post {
        success {
            echo "🎉 Pipeline executed successfully!"
            echo "🌐 Your app should be available at: https://rajeshrj-git.github.io/invoice-generator/"
        }
        failure {
            echo "❌ Pipeline failed"
            echo "💡 If you see permission errors, check your GitHub token permissions:"
            echo "   - Go to GitHub → Settings → Developer settings → Personal access tokens"
            echo "   - Make sure 'repo' and 'workflow' permissions are enabled"
        }
        always {
            sh 'rm -rf ~/.npm ~/.cache'  
        }
    }
}