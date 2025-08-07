-- CreateTable
CREATE TABLE "public"."usuario" (
    "id_user" SERIAL NOT NULL,
    "nm_user" VARCHAR(50) NOT NULL,
    "nm_login" VARCHAR(30) NOT NULL,
    "nm_email" VARCHAR(100) NOT NULL,
    "vl_password" VARCHAR(300) NOT NULL,
    "vl_salt" VARCHAR(50) NOT NULL,
    "dt_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "public"."imagens" (
    "id_image" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "nm_image" VARCHAR(200) NOT NULL,
    "nm_stored" VARCHAR(200) NOT NULL,
    "vl_size_kb" INTEGER NOT NULL,
    "dt_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "imagens_pkey" PRIMARY KEY ("id_image")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_nm_user_key" ON "public"."usuario"("nm_user");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_nm_login_key" ON "public"."usuario"("nm_login");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_nm_email_key" ON "public"."usuario"("nm_email");

-- AddForeignKey
ALTER TABLE "public"."imagens" ADD CONSTRAINT "imagens_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "public"."usuario"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;
