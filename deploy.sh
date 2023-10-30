echo "Deploying to gcloud..."

gcloud functions deploy shawn_cat_line \
--gen2 \
--runtime=nodejs20 \
--region=asia-east1 \
--source=. \
--max-instances=5 \
--entry-point=main \
--trigger-http \
--allow-unauthenticated 

echo "Deployed to gcloud!"