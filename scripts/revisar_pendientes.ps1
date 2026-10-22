$ErrorActionPreference = "Stop"

$env:PYTHONUTF8 = "1"

[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)

$OutputEncoding = [System.Text.UTF8Encoding]::new($false)

# Raíz del proyecto:
# C:\Users\adria\Desktop\plurione-onboarding
$projectRoot = Split-Path -Parent $PSScriptRoot

# Python del entorno virtual del proyecto
$pythonPath = Join-Path `
    $projectRoot `
    ".venv\Scripts\python.exe"

# manage.py de Django
$managePath = Join-Path `
    $projectRoot `
    "backend\manage.py"

# Log local fuera del repositorio
$logDirectory = Join-Path `
    $env:LOCALAPPDATA `
    "PluriOne\logs"

$logFile = Join-Path `
    $logDirectory `
    "revisar_pendientes.log"


# Crear carpeta de logs si no existe
New-Item `
    -ItemType Directory `
    -Force `
    -Path $logDirectory `
    | Out-Null


# Validar que exista el Python del entorno virtual
if (-not (Test-Path $pythonPath)) {
    throw (
        "No se encontró Python del entorno virtual en: " +
        $pythonPath
    )
}


# Validar que exista manage.py
if (-not (Test-Path $managePath)) {
    throw (
        "No se encontró manage.py en: " +
        $managePath
    )
}


$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

"========================================" |
    Out-File `
        -FilePath $logFile `
        -Append `
        -Encoding utf8

"Inicio automatico: $timestamp" |
    Out-File `
        -FilePath $logFile `
        -Append `
        -Encoding utf8


# Ejecutar el seguimiento automático.
# Se usan los valores normales:
# 2 días sin movimiento
# 24 horas antes de repetir recordatorio
$output = & $pythonPath `
    $managePath `
    revisar_pendientes `
    --days 2 `
    --repeat-hours 24 `
    2>&1

$exitCode = $LASTEXITCODE


# Mostrar resultado si se ejecuta manualmente
$output


# Guardar resultado en log
$output |
    Out-File `
        -FilePath $logFile `
        -Append `
        -Encoding utf8


$finishedAt = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

"Fin automatico: $finishedAt | Codigo: $exitCode" |
    Out-File `
        -FilePath $logFile `
        -Append `
        -Encoding utf8


if ($exitCode -ne 0) {
    throw (
        "El seguimiento automático terminó " +
        "con código de error $exitCode."
    )
}