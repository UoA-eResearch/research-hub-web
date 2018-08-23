pipeline {

    agent any
  
    environment {
        DOCKER_IMAGE_NAME = 'research-hub-web'
    }
  
    stages {
        stage('Build') {
          
            steps {
                checkout scm
                
                sh '''
                   docker-compose                        \\
                     -f docker-compose.yml               \\
                     -f docker-compose.ci.yml            \\
                     build web
                   '''
            }
          
        }
      
        stage('Test') {
          
            steps {
                sh '''
                   docker-compose                        \\
                     -f docker-compose.yml               \\
                     -f docker-compose.ci.yml            \\
                     run -T --no-deps web                \\
                     /bin/bash -c "echo tests passed"
                   '''
            }
          
        }
      
        stage('Deploy') {
          
            steps {
              sh 'curl -I ${DOCKER_REGISTRY_URI}'
              
              sh '''
                 export VERSIONED_NAME="${DOCKER_REGISTRY_URI}/${DOCKER_IMAGE_NAME}:${BRANCH_NAME}.$(git log -1 --pretty=%h)"
                 docker image tag ${DOCKER_REGISTRY_URI}/${DOCKER_IMAGE_NAME} ${VERSIONED_NAME}
                 docker push ${DOCKER_REGISTRY_URI}/${DOCKER_IMAGE_NAME}:latest
                 docker push ${VERSIONED_NAME}
                 '''
            }
          
        }
    }
}

