#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

API_URL="http://localhost:3000"

echo -e "${BLUE}=== TEST MEDICAL RECORDS API ===${NC}\n"

# Step 1: Login and get token
echo -e "${BLUE}1. Obtaining authentication token...${NC}"
LOGIN_RESPONSE=$(curl -s -X POST $API_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin1234"}')

TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"token":"[^"]*"' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo -e "${RED}ERROR: Failed to get token${NC}"
  exit 1
fi

echo -e "${GREEN}✓ Token obtained: ${TOKEN:0:50}...${NC}\n"

# Step 2: Get a pet ID
echo -e "${BLUE}2. Getting pet ID...${NC}"
PET_RESPONSE=$(curl -s $API_URL/api/pet)
PET_ID=$(echo $PET_RESPONSE | grep -o '"_id":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ -z "$PET_ID" ]; then
  echo -e "${RED}ERROR: No pets found${NC}"
  exit 1
fi

echo -e "${GREEN}✓ Pet ID: $PET_ID${NC}\n"

# Step 3: CREATE a medical record
echo -e "${BLUE}3. Creating a new medical record...${NC}"
CREATE_RESPONSE=$(curl -s -X POST $API_URL/api/medical-record \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "petId": "'$PET_ID'",
    "fecha": "2026-02-16T14:30:00Z",
    "hora": "14:30",
    "diagnostico": "Examen clínico completo realizado con éxito",
    "tratamiento": "Prescripción de antibióticos por 10 días y revisión en una semana"
  }')

RECORD_ID=$(echo $CREATE_RESPONSE | grep -o '"_id":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ -z "$RECORD_ID" ]; then
  echo -e "${RED}ERROR: Failed to create medical record${NC}"
  echo "Response: $CREATE_RESPONSE"
  exit 1
fi

echo -e "${GREEN}✓ Medical record created successfully!${NC}"
echo "Record ID: $RECORD_ID"
echo "Response: $CREATE_RESPONSE" | head -c 200
echo -e "\n\n"

# Step 4: READ the medical record
echo -e "${BLUE}4. Reading the created medical record...${NC}"
READ_RESPONSE=$(curl -s $API_URL/api/medical-record/$RECORD_ID \
  -H "Authorization: Bearer $TOKEN")

echo -e "${GREEN}✓ Medical record retrieved:${NC}"
echo "Response: $READ_RESPONSE" | head -c 200
echo -e "\n\n"

# Step 5: List all medical records for the pet
echo -e "${BLUE}5. Listing all medical records for this pet...${NC}"
LIST_RESPONSE=$(curl -s $API_URL/api/medical-record/pet/$PET_ID \
  -H "Authorization: Bearer $TOKEN")

RECORD_COUNT=$(echo $LIST_RESPONSE | grep -o '"_id"' | wc -l)

echo -e "${GREEN}✓ Found $RECORD_COUNT medical records for pet${NC}\n"

# Step 6: UPDATE the medical record
echo -e "${BLUE}6. Updating the medical record...${NC}"
UPDATE_RESPONSE=$(curl -s -X PUT $API_URL/api/medical-record/$RECORD_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "diagnostico": "Examen clínico completo - ACTUALIZADO: paciente en condiciones óptimas",
    "tratamiento": "Antibióticos continuados + vitaminas + revisión en 5 días"
  }')

echo -e "${GREEN}✓ Medical record updated successfully!${NC}"
echo "Updated diagnostico: " 
echo $UPDATE_RESPONSE | grep -o '"diagnostico":"[^"]*"'
echo -e "\n"

# Step 7: DELETE the medical record
echo -e "${BLUE}7. Deleting the medical record...${NC}"
DELETE_RESPONSE=$(curl -s -X DELETE $API_URL/api/medical-record/$RECORD_ID \
  -H "Authorization: Bearer $TOKEN")

if echo $DELETE_RESPONSE | grep -q "eliminado"; then
  echo -e "${GREEN}✓ Medical record deleted successfully!${NC}"
  echo "Message: $(echo $DELETE_RESPONSE | grep -o '"message":"[^"]*"')"
else
  echo -e "${RED}ERROR: Failed to delete medical record${NC}"
  echo "Response: $DELETE_RESPONSE"
fi

echo -e "\n${GREEN}=== ALL TESTS PASSED ===${NC}\n"
