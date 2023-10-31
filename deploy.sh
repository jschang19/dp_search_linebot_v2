echo "Deploying to gcloud..."

gcloud functions deploy shawn_cat_line \
--gen2 \
--runtime=nodejs18 \
--region=asia-east1 \
--source=. \
--max-instances=3 \
--entry-point=handleRequest \
--trigger-http \
--allow-unauthenticated 

echo "Deployed to gcloud!"