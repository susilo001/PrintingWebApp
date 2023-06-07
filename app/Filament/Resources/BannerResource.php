<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BannerResource\Pages;
use App\Models\Banner;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Columns\SpatieMediaLibraryImageColumn;
use Filament\Tables\Columns\TextColumn;

class BannerResource extends Resource
{
    protected static ?string $model = Banner::class;

    protected static ?string $navigationIcon = 'heroicon-o-newspaper';

    protected static ?string $navigationGroup = 'Settings';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Grid::make()->columns(2)->schema([
                    TextInput::make('title')
                        ->autofocus()
                        ->required(),
                    TextInput::make('url')
                        ->required(),
                    SpatieMediaLibraryFileUpload::make('image')
                        ->image()
                        ->collection('banners')
                        ->imageCropAspectRatio('16:9')
                        ->imageResizeTargetWidth('1920')
                        ->imageResizeTargetHeight('1080')
                        ->responsiveImages()
                        ->required(),
                    Textarea::make('description')
                        ->required(),
                    Toggle::make('status')
                        ->inline()
                        ->label('Active'),
                ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                SpatieMediaLibraryImageColumn::make('image')
                    ->collection('banners')
                    ->square()
                    ->label('Image'),
                TextColumn::make('title')
                    ->searchable(),
                TextColumn::make('description'),
                TextColumn::make('url'),
                BadgeColumn::make('status')
                    ->icons([
                        'heroicon-o-x-circle' => static fn ($state): bool => $state === false,
                        'heroicon-o-check-circle' => static fn ($state): bool => $state === true,
                    ])
                    ->color(static fn ($state): string => $state ? 'success' : 'danger')
                    ->label('Active')
                    ->sortable(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ManageBanners::route('/'),
        ];
    }
}
