pipeline{
    agent any 
    stages{
        stage('Checkout'){
            steps{
                git branch: 'main', url: 'https://github.com/rajeshrj-git/invoice-generator'  
                echo 'Github Checkout Done✅'            }
        }
        stage('Build Docker image'){
            steps{
                sh'docker build -t rajeshchoco13/invoice-generator:2.1  .'
                echo 'Buil image Done ✅'
            }
        }
        stage('Docker Hub pushing'){
            steps{
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', passwordVariable: 'docker_pass', usernameVariable: 'docker_user')]) {
                sh'docker login -u ${docker_user} -p ${docker_pass}'
}
               sh'docker push rajeshchoco13/invoice-generator:2.1 '
                echo 'Docker Hub Push Done ✅'


            }
        }
        stage('K8 Deploy'){
            steps {
                    sh '''
                        kubectl get pods -A
                        
                        # Create or update deployment
                        kubectl create deployment invoice-generator --image=rajeshchoco13/invoice-generator:2.1 --dry-run=client -o yaml | kubectl apply -f -
                        
                        # Wait for rollout
                        kubectl rollout status deployment/invoice-generator
                        
                        # Show pods
                        kubectl get pods -l app=invoice-generator
                    '''
                    echo "Deployment using Kubernetes is Done ✅"
                }
        }
    }
}

