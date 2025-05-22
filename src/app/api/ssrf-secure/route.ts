import { NextRequest, NextResponse } from "next/server";
import dns from "dns/promises";

function isPrivateIp(ip: string): boolean {
  const privateRanges = [
    /^127\./,
    /^10\./,
    /^192\.168\./,
    /^172\.(1[6-9]|2\d|3[0-1])\./,
    /^169\.254\.169\.254$/,
  ];
  return privateRanges.some((regex) => regex.test(ip));
}

function isLoopback(ip: string): boolean {
  return ip === "127.0.0.1" || ip === "::1";
}

async function resolveIps(hostname: string): Promise<string[]> {
  try {
    const addresses = await dns.lookup(hostname, { all: true });
    return addresses.map((a) => a.address);
  } catch {
    return [];
  }
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (typeof url !== "string") {
      return NextResponse.json(
        {
          status: 400,
          contentType: "application/json",
          body: "",
          error: "'url' must be a string",
        },
        { status: 400 }
      );
    }

    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url);
    } catch {
      return NextResponse.json(
        {
          status: 400,
          contentType: "application/json",
          body: "",
          error: "Invalid URL format",
        },
        { status: 400 }
      );
    }

    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
      return NextResponse.json(
        {
          status: 400,
          contentType: "application/json",
          body: "",
          error: "Only HTTP and HTTPS protocols are allowed",
        },
        { status: 400 }
      );
    }

    const ips = await resolveIps(parsedUrl.hostname);
    if (ips.length === 0) {
      return NextResponse.json(
        {
          status: 400,
          contentType: "application/json",
          body: "",
          error: "Failed to resolve hostname",
        },
        { status: 400 }
      );
    }

    for (const ip of ips) {
      if (isLoopback(ip)) {
        return NextResponse.json(
          {
            status: 403,
            contentType: "application/json",
            body: "",
            error: `Request blocked: Loopback IP (${ip}) is not allowed`,
          },
          { status: 403 }
        );
      }
      if (isPrivateIp(ip)) {
        return NextResponse.json(
          {
            status: 403,
            contentType: "application/json",
            body: "",
            error: `Request blocked: Private or metadata IP (${ip}) is not allowed`,
          },
          { status: 403 }
        );
      }
    }

    // Fetch the remote URL
    const fetchRes = await fetch(url);
    const contentType = fetchRes.headers.get("content-type") || "unknown";
    const status = fetchRes.status;
    const body = await fetchRes.text();

    return NextResponse.json({
      status,
      contentType,
      body,
    });
  } catch (err) {
    return NextResponse.json(
      {
        status: 500,
        contentType: "application/json",
        body: "",
        error: `Failed to fetch the URL: ${(err as Error).message}`,
      },
      { status: 500 }
    );
  }
}
