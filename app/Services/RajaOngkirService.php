<?php

namespace App\Services;

class RajaOngkirService
{
    protected $origin = 501; // Diambil dari id kota DI Yogyakarta di RajaOngkir

    protected function request($endpoint, $method = 'GET', $body = [])
    {
        $client = new \GuzzleHttp\Client();

        $response = $client->request($method, config('services.rajaongkir.base_url') . $endpoint, [
            'headers' => [
                'key' => config('services.rajaongkir.api_key')
            ],
            'form_params' => $body
        ]);

        return json_decode($response->getBody()->getContents(), true);
    }

    public function getProvinces()
    {
        return $this->request('/province');
    }

    public function getCities()
    {
        return $this->request('/city');
    }

    public function cost($payload)
    {
        return $this->request('/cost', 'POST', [
            'origin' => $this->origin,
            'destination' => $payload['destination'],
            'weight' => $payload['weight'],
            'courier' => $payload['courier'],
        ]);
    }
}
