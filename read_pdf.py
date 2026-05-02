import os
try:
    from pypdf import PdfReader
except ImportError:
    os.system('pip install pypdf --quiet')
    from pypdf import PdfReader

with open('pdf_content_utf8.txt', 'w', encoding='utf-8') as out:
    reader = PdfReader('SalonSync_Project_Proposal.pdf')
    for page in reader.pages:
        out.write(page.extract_text() + '\n')
