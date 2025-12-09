#!/bin/bash

# Security monitoring script for Fly.io deployment
echo "🔐 Security Check Report - $(date)"
echo "=================================="

# Check for suspicious processes
echo "📊 Checking machine status..."
fly machines list --app bbr-production

# Check recent logs for security issues
echo "📋 Scanning logs for security threats..."
fly logs --app bbr-production | tail -100 | grep -i -E "(curl|wget|chmod|xmrig|kdevtmpfsi|cpuminer|\.sh|pastebin|transfer\.sh|dropbox|tmp|mining|bitcoin|crypto)" || echo "✅ No obvious crypto-mining signatures found in recent logs"

# Check app health
echo "🏥 Application Health Check..."
fly status --app bbr-production

echo "=================================="
echo "✅ Security scan complete!"
echo "⚠️  Remember to:"
echo "   1. Rotate ALL API keys in external services"
echo "   2. Check Redis/Database for unauthorized access"
echo "   3. Monitor resource usage for anomalies"
echo "   4. Review access logs in all connected services"
