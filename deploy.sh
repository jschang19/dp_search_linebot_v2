echo "Deploying to gcloud..."

gcloud run deploy shawn-cat-line \
--source . \
--function handleRequest \
--region asia-east1 \
--allow-unauthenticated \
--no-traffic \
&& gcloud run services update-traffic shawn-cat-line \
--to-latest \
--region asia-east1


echo "Deployed to gcloud!"