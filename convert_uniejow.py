import zipfile, io, os

ZIP_SRC = r"C:\Users\48732\AppData\Local\Temp\uniejow_tmp.zip"
DST = r"D:\Rafał\Projekty\klub-nadzieja-strona\img\aktualnosci"

# Copy zip to temp location first
import shutil
shutil.copy(r"C:\Users\Public\uniejow_upload.zip", ZIP_SRC)

try:
    from PIL import Image
    use_pil = True
except ImportError:
    use_pil = False
    print("PIL not available, copying as jpg")

with zipfile.ZipFile(ZIP_SRC) as z:
    imgs = sorted([f for f in z.namelist() if f.lower().endswith('.jpg')])
    for i, name in enumerate(imgs, 1):
        raw = z.read(name)
        out_webp = os.path.join(DST, f"uniejow_{i}.webp")
        out_jpg  = os.path.join(DST, f"uniejow_{i}.jpg")
        if use_pil:
            with Image.open(io.BytesIO(raw)) as img:
                img = img.convert("RGB")
                img.thumbnail((1400, 1050), Image.LANCZOS)
                img.save(out_webp, "WEBP", quality=80, method=6)
            print(f"uniejow_{i}.webp  {len(raw)//1024}KB -> {os.path.getsize(out_webp)//1024}KB")
        else:
            with open(out_jpg, "wb") as f:
                f.write(raw)
            print(f"uniejow_{i}.jpg  {len(raw)//1024}KB")

print("DONE")
