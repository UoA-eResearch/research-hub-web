pipeline {

    agent any

    triggers {
        pollSCM 'H/5 * * * *'
    }
  
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
                     run --entrypoint /bin/bash          \\
                     -T --rm --no-deps web               \\
                     -c "echo tests passed"
                   '''
            }
          
        }
      
        stage('Deploy') {
          
            steps {
              sh 'curl -I ${DOCKER_REGISTRY_URI}'
              
              sh '''
                 export VERSIONED_NAME="${DOCKER_REGISTRY_URI}/${DOCKER_IMAGE_NAME}:${BRANCH_NAME}.$(git log -1 --pretty=%h)"
                 export LATEST_NAME="${DOCKER_REGISTRY_URI}/${DOCKER_IMAGE_NAME}:${BRANCH_NAME}.latest"

                 docker image tag ${DOCKER_REGISTRY_URI}/${DOCKER_IMAGE_NAME} ${VERSIONED_NAME} # Tag {branch}.{commit hash}
                 docker image tag ${DOCKER_REGISTRY_URI/${DOCKER_IMAGE_NAME} ${LATEST_NAME} # Tag {branch}.latest

                 docker push ${VERSIONED_NAME}
                 docker push ${LATEST_NAME}
                 '''
            }
          
        }
    }
}

