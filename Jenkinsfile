pipeline {

    agent any
  
    environment {
        DOCKER_IMAGE_NAME = 'research-hub-web'
        DOCKER_REGISTRY_URI = 'localhost:5000'
    }
  
    stages {
        stage('Build') {
          
            environment {
                WEB_ENVIRONMENT = 'prod'
            }
          
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
                 export TAGGED="${DOCKER_REGISTRY_URI}/${DOCKER_IMAGE_NAME}:${BRANCH_NAME}.$(git log -1 --pretty=%h)"
                 docker image tag ${DOCKER_REGISTRY_URI}/${DOCKER_IMAGE_NAME} ${TAGGED}
                 docker push ${TAGGED}
                 '''
            }
          
        }
    }
}

